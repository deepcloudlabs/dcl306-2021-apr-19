import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import Mastermind from "./component/mastermind";
import {Route, BrowserRouter as Router } from "react-router-dom";
import {UserWins} from "./component/user-wins";

const routing = (
  <Router>
      <Route path="/" exact component={Mastermind}></Route>
      <Route path="/wins" component={UserWins}></Route>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

/*
ReactDOM.render(
  <React.StrictMode>
    <Mastermind />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
