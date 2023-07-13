import Row from "../row/Row";

const Board = ({size, colorOdd, colorEven, isFlip}) => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(i);
  }

  return rows.map((row, index) => {
    return (
      <Row
        key={index}
        row={row}
        size={size}
        colorOdd={colorOdd}
        colorEven={colorEven}
        isFlip={isFlip}
      />
    );
  });
};

export default Board;