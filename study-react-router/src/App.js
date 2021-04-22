import React from 'react';

import Content from './Content';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Post from './Post';
import {HashRouter as Router, Route, withRouter} from 'react-router-dom';
import Posts from "./Posts";

export default class App extends React.Component {
    render() {
        return (
            <Router basename="/posts">
                <Route path="/" component={Content}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={withRouter(Contact)}/>
                <Route path="/login" component={Login}/>
                <Route exact path="/post/:id" component={Post}/>
                <Route path="/posts" component={Posts}/>
            </Router>
        );
    }
};