import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

export default class Posts extends React.Component {
    render() {
        let items = [1,2,3,4].map( i => <li key={i}>
            <Link to={'/post/'+i} className="active">Post #{i}</Link>
        </li>);

        return (<div className="container-fluid"><ul>
            {items}
        </ul></div>);
    }
}