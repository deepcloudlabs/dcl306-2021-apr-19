import React from "react";

export default function FormCheckBox(props) {
    return (
        <div className="form-group">
            <div className="form-check">
                <input type="checkbox" name={props.name} className="form-check-input"
                       onChange={(event) => props.handler(event)}
                       checked={props.checked}></input>
                <label>{props.label}</label>
            </div>
        </div>
    );
}