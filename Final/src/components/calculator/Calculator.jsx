import './Calculator.css'
import Button from './Button';
import Display from './Display'
import { useState } from 'react'
import { Layout, Typography, Space } from 'antd';
const {Title} = Typography
let operands = [];
let curOperator = null;

function Calculator() {
  const [value, setValue] = useState("0");
  const [result, setResult] = useState("");

  function handleButtonClick(val){
    if (value!="0") {
      setValue(`${value}${val}`);
    }
    else{
      setValue(`${val}`);
    }
  }

  function handleSign(){
    let newVal=(+value)*-1;
    setValue(newVal)
  }

  function handleClearAll(){
    setValue("0");
    setResult("");
    curOperator=null;
    operands=[];
  }

  function handleClearOne(){
    setValue(`${value}`.slice(0, -1));
  }
  function handleClearInput(){
    setValue("0");
  }

  function evaluate(operands, operators) {
    if (operands.length === 1) {
      return operands[0]; 
    }
    let result = operands[0];
    for(let i = 0; i < operators.length; i++) {
      switch(operators[i]) {
        case '+':
          result += operands[i+1];
          break;
        case '-':
          result -= operands[i+1];
          break;
        case '*':
          result *= operands[i+1];
          break;
        case '/':
          result /= operands[i+1];
          break;
        default:
          break;
      }
    }
    return result;
  }

  function handleOperator(operator){
    if(operands.length<1){
      curOperator=operator;
      operands.push(+value);
      setValue("");
      setResult(`${value}${operator}`);
    }
    else if (operands.length < 2) {
      operands.push(+value);
      let result = evaluate(operands, curOperator);
      operands = [];
      operands.push(+result);
      curOperator = operator;
      setValue("");
      setResult(`${result}${operator}`);
    }
  }

  function handleEqual(){
        operands.push(+value);
        let result = evaluate(operands, curOperator);
        if(result===undefined){
          setResult(`${value}`);
        }
        else{
          operands = [];
          operands.push(+result);
          setValue(`${result}`);
          setResult("");
          operands = [];
        }
  }
  
  const buttons =[
    {value: "AC", onClick: ()=>handleClearAll()},
    {value: "C", onClick: ()=>handleClearInput()},
    {value: "Back", label:"\u2190", onClick: ()=>handleClearOne()},
    {value: "/", onClick: ()=>handleOperator("/")},
    {value: 7, onClick: ()=>handleButtonClick(7)},
    {value: 8, onClick: ()=>handleButtonClick(8)},
    {value: 9, onClick: ()=>handleButtonClick(9)},
    {value: "*", onClick: ()=>handleOperator("*")},
    {value: 4, onClick: ()=>handleButtonClick(4)},
    {value: 5, onClick: ()=>handleButtonClick(5)},
    {value: 6, onClick: ()=>handleButtonClick(6)},
    {value: "-", onClick: ()=>handleOperator("-")},
    {value: 1, onClick: ()=>handleButtonClick(1)},
    {value: 2, onClick: ()=>handleButtonClick(2)},
    {value: 3, onClick: ()=>handleButtonClick(3)},
    {value: "+", onClick: ()=>handleOperator("+")},
    {value: 0, onClick: ()=>handleButtonClick(0)},
    {value: "+/-", onClick: ()=>handleSign()},
    {value: ".", onClick: ()=>handleButtonClick(".")},
    {value: "=", onClick: ()=>handleEqual()},
  ]

  return (
      <Layout className='calculator'>
        <Title level={2}>Calculator</Title>
        <Display value={value} result={result} />
        <Space className='content'>{
          buttons.map(
              (b, idx) => <Button 
                key={idx} 
                value={b.value} 
                label={b.label}
                onClick={b.onClick}
                />
            )
          }</Space>
      </Layout>
  )
}

export default Calculator;