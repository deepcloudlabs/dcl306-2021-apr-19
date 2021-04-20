import React from "react";

function Badge(props) {
    return (
        <div className="form-group">
            <h4><span className={props.className}>{props.value}</span></h4>
        </div>

    )
}

export default Badge;