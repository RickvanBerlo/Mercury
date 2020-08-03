import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routes/router';
import { Provider } from 'react-redux'
import store from './stores/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.l your server page, add this liney/CRA-PWA
serviceWorker.unregister();
