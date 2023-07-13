import "./Cell.css";

const Cell = ({cell, colorEven, colorOdd, isFlip}) => {  
  if (cell % 2 === 0) {
    return <div className="Cell-Black" style={{backgroundColor: colorEven}} onClick={isFlip}/>;
  } else {
    return <div className="Cell-White" style={{backgroundColor: colorOdd}} onClick={isFlip}/>;
  }
}

export default Cell;
