import { useState } from "react";
import "./ChessBoard.css";
import { Layout, Space, Typography, InputNumber} from "antd";
import Board from "./board/Board";
const {Title, Text} = Typography
const Chessboard = () => {
  const [size, setSize] = useState(0);
  const [colorOdd, setColorOdd] = useState("#C0C0C0");
  const [colorEven, setColorEven] = useState("#000000");
  const [isFlip, setIsFlip] = useState(false);

  const flip = () => {
    setIsFlip(!isFlip);
    if (isFlip) { 
      setColorEven(colorOdd);
      setColorOdd(colorEven);
    }
  };

  return (
    <>
    <Layout className="chess">
      <Title style={{marginTop: 10, textAlign: 'left', marginLeft: 30}} level={2}>Chessboard</Title>
      <Space style={{height: 50, marginLeft: 30}}>
        <Text strong>Board size: </Text>
        <InputNumber min={1} max={20} placeholder="Input size" onChange={(value) => setSize(value)} />
      </Space>
 
      <Space className="input-row">
        <Text strong>Odd cell: </Text>
        <input
          type="color"
          id="head"
          name="head"
          value={colorOdd}
          onChange={(e) => setColorOdd(e.target.value)}
        ></input>
      </Space>

      <Space className="input-row">
        <Text strong>Even cell: </Text>
        <input
          type="color"
          id="head"
          name="head"
          value={colorEven}
          onChange={(e) => setColorEven(e.target.value)}
        ></input>
      </Space>

      <Space className="board" style={{marginTop: 10}}>
        <Board
          size={size}
          colorOdd={colorOdd}
          colorEven={colorEven}
          isFlip={flip}
        />
      </Space>
      </Layout>
    </>
  );
};

export default Chessboard;
