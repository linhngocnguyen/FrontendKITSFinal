import "./Row.css";
import Cell from "../cell/Cell";

function Row({size, row, colorOdd, colorEven, isFlip}) {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(i);
  }

  if (row % 2 === 1) {
    return (
      <div className="row">
        {rows.map((row, index) => {
          return (
            <Cell
              key={index}
              cell={row}
              colorOdd={colorOdd}
              colorEven={colorEven}
              isFlip={isFlip} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="row">
        {rows.map((row, index) => {
          return (
            <Cell
              key={index}
              cell={row + 1}
              colorOdd={colorOdd}
              colorEven={colorEven}
              isFlip={isFlip} />
          );
        })}
      </div>
    );
  }
}


export default Row;
