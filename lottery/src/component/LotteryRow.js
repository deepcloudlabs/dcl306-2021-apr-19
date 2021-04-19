import React from "react";

function LotteryRow(props) {
    return <tr>{
            props.numbers.map( (number,idx) => <td key={idx}>{number}</td>)
        }
        <td key="6"><button className="btn btn-danger" onClick={() => props.removeRow(props.index)}>Remove</button></td>
        </tr>
}

export default LotteryRow;