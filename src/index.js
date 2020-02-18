import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routes/router';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faTimes, faArrowLeft, faArrowRight, faArrowDown, faArrowAltCircleDown, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faTimes, faArrowLeft, faArrowRight, faArrowDown, faArrowAltCircleDown, faArrowAltCircleLeft);

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.l your server page, add this liney/CRA-PWA
serviceWorker.unregister();
