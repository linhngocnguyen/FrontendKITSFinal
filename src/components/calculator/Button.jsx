function Button( {value, label, onClick} ){
    return(
        <button className="calButton" onClick={onClick}>
        {label || value}
        </button>
    )
}
export default Button;