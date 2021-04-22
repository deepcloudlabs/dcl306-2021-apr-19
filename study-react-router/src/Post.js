import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

export default class Post extends React.Component {
    constructor({props, match}){
        super(props);
        this.match = match;
    }
    posts = {
        1: {
            text: "First Blog",
            link: "https://www.example.com/1"
        }, 2: {
            text: "Second Blog",
            link: "https://www.example.com/2"
        }, 3: {
            text: "Third Blog",
            link: "https://www.example.com/3"
        }, 4: {
            text: "Forth Blog",
            link: "https://www.example.com/4"
        }
    };
    render() {
        let id = this.match.params.id;
        let text = this.posts[id].text;
        let link = this.posts[id].link;
        return <div>
            <h3>{this.match.params.id}</h3>
            <p>{text}</p>
            <p><a href={link} target="_blank">Continue reading...</a></p>
            <p><Link to='/posts' className="active">Posts</Link>
            </p>
        </div>
    }
};