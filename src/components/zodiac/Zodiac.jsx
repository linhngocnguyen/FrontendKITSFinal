import { useState } from "react";
import { Form, Select, Button, Space, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

function getWesternZodiac(date) {
    const zodiacs = [
      { name: "Capricorn", start: [1, 1], end: [1, 19] },
      { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] },
      { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] },
      { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", start: [11, 22], end: [12, 21] },
      { name: "Capricorn", start: [12, 22], end: [12, 31] },
    ];
  
    const m = date.getMonth() + 1;
    const d = date.getDate();
  
    for (let i = 0; i < zodiacs.length; i++) {
      const start = zodiacs[i].start;
      const end = zodiacs[i].end;
  
      if (m === start[0] && d >= start[1]) {
        return zodiacs[i].name;
      } else if (m === end[0] && d <= end[1]) {
        return zodiacs[i].name;
      }
    }
  
    return null;
  }

function getChineseZodiac(year) {
  const zodiacs = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];

  const startYear = 1900;
  const offset = 12;
  return zodiacs[(year - startYear) % offset];
}

function ZodiacApp() {
  const [westernZodiac, setWesternZodiac] = useState(null);
  const [chineseZodiac, setChineseZodiac] = useState(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  const years = Array.from({ length: 122 }, (_, i) => 1900 + i);

  const onFinish = (values) => {
    const { day, month, year } = values;
    const date = new Date(`${year}-${month}-${day}`);
    setWesternZodiac(getWesternZodiac(date));
    setChineseZodiac(getChineseZodiac(year));
  };

  return (
    <div style={{textAlign: 'left', marginLeft: 50, marginTop: 20}}>
    <Space direction='vertical'>
      <Typography.Title level={2}>Zodiac App</Typography.Title>
      <Form
        name="zodiac-form"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item>
           <Text strong>Date of Birth: </Text> 
          <Space>
            <Form.Item name="day" rules={[{ required: true }]}>
              <Select placeholder="Day">
                {days.map((d) => (
                  <Option key={d} value={d}>
                    {d}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="month" rules={[{ required: true }]}>
              <Select placeholder="Month">
                {months.map((m) => (
                  <Option key={m.value} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="year" rules={[{ required: true }]}>
              <Select placeholder="Year">
                {years.map((y) => (
                  <Option key={y} value={y}>
                    {y}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Space direction="vertical">
        {westernZodiac && (
            <Text style={{fontSize: 25}}>
            Your Western zodiac sign is <strong>{westernZodiac}</strong>.
            </Text>
        )}
        {chineseZodiac && (
            <Text style={{fontSize: 25}}>
            Your Chinese zodiac sign is <strong>{chineseZodiac}</strong>.
            </Text>
        )}
     </Space>
    </Space>
    </div>
  );
}

export default ZodiacApp;