import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default class Login extends React.Component {
    render() {
        return <div>
            <h3>Login</h3>
            <input type="text" placeholder="email" className="form-control"></input>
            <input type="text" placeholder="password" className="form-control"></input>
            <button className="btn btn-primary">login</button>
        </div>
    }
};