import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TreechatUglyInterface from './TreechatUglyInterface';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TreechatUglyInterface />, document.getElementById('root'));
registerServiceWorker();
