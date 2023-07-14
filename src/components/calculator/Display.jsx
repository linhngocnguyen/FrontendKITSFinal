import { Space } from "antd";
function Display({value, result}){
    return(
        <Space className="display" style={{height: 135}}>   
            <Space className="result"> {value}</Space>
            <Space className="operate"> {result}</Space>
        </Space>
    )
}
export default Display;