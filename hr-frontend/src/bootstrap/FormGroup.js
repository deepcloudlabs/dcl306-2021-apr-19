import React from "react";

export default function FormGroup(props){
    let label = "";
    if (props.label){
        label = <label>{props.label}:</label>;
    }
    return (
        <div className="form-group">
            {label}
            {props.children}
        </div>
    );
}