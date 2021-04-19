import React from "react";

function Badge(props){
    return (
        <div className="form-group">
            <h2>{props.label}: <span className="badge badge-info badge-secondary">{props.value}</span></h2>
        </div>

    )
}

export default Badge;