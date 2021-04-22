import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import { Link } from 'react-router-dom'
import Posts from "./Posts";

export default class Content extends React.Component {

    render() {
        return (
            <div className="container">
                <h1>Blog Web App</h1>
                <div className="navbar navbar-default">
                    <ul className="nav nav-pills navbar-nav ">
                        <li>
                            <Link to="/about" className="active">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="active">
                                Contact Us
                            </Link>
                        </li>                        <li>
                            <Link to="/posts" className="active">
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="active">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
}