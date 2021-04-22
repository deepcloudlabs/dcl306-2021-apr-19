function Counter(props) {
    return (
        <div className="container">
            <button className="buttons" onClick={props.decreaseCount}>-</button>
            <span>{props.countValue}</span>
            <button className="buttons" onClick={props.increaseCount}>+</button>
        </div>
    );
};

export default Counter;