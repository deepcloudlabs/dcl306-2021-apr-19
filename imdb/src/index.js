import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Imdb from './Imdb';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Imdb />, document.getElementById('root'));
registerServiceWorker();
