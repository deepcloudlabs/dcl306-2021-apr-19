import React from "react";

export default function FormPhoto(props){
 return (
    <div className="form-group">
        <label>{props.label}</label>
        <img className="img-thumbnail"
             src={props.src}
             alt=""
             style={props.style}></img>
        <label className="btn btn-success">
            <input type="file"
                   style={{display: "none"}}
                   onChange={(event) => props.handler(event)}
                   className="form-control"></input>
            <span>File</span>
        </label>
    </div>
 ) ;
}
