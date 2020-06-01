import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {
    Route,
    Switch,
    HashRouter
} from "react-router-dom";

import './assets/scss/style.scss';
import App from './App';
import './index.css';
import appService from './appService';
import * as serviceWorker from './serviceWorker';

var hist = createBrowserHistory();

ReactDOM.render(
    <HashRouter history={hist}>
        <App appService={appService} />
    </HashRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
