import { useEffect, useState } from "react";
import { Space, Typography, Card, Input, Row, Col} from "antd"

const {Text, Title} = Typography
const {Search} = Input;

function QuoteOfTheDay() {
  const [quote, setQuote] = useState([]);
  const [numQuotes, setNumQuotes] = useState(0);

  const fetchQuote = async () => {
    const response = await fetch(`http://localhost:3000/quote`);
    const data = await response.json();
    return data;
  };

  const fetchQuotes = async () => {
    const quotePromises = [];
    for (let i = 0; i < numQuotes; i++) {
      const quotePromise = fetchQuote();
      quotePromises.push(quotePromise);
    }
    const quotes = await Promise.all(quotePromises);
    return quotes;
  };

  const fetchRandomQuote = () => {
    fetchQuotes()
      .then((data) => setQuote(data))
      .catch((error) => console.log(error));
  };

  const handleNumQuotesChange = (event) => {
    setNumQuotes(parseInt(event.target.value));
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <Space direction="vertical">
      <Title level={3}>Random Quote</Title>
      <Space>
        <Text strong style={{textAlign: 'center'}}>Number of quotes: </Text>
        <Space>
          <Search
            label = "Number of Quotes"
            placeholder="Enter number of quotes"
            enterButton="Get Quotes"
            size="large"
            onSearch={fetchRandomQuote}
            onChange={handleNumQuotesChange}
            value={numQuotes}
            type="number"
            style={{width: 200, marginTop: 30}}
          />
        </Space>
      </Space>
      {quote.length > 0 && (
        <Row gutter={[16,8]}>
          {quote.map((q, index) => (
            <Col span={6} key={index}>
              <Card title={q.author} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', overflow: 'auto' }}>
                <Text>{q.quote}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Space>
  );
}

export default QuoteOfTheDay;