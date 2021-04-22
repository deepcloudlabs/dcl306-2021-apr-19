import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WorldApp from './WorldApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WorldApp />, document.getElementById('root'));
registerServiceWorker();
