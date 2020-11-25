import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import Admin from './components/Admin';
import Plant from './components/Plant';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Router>
	  <Route exact path="/" component={App}/>
	  <Route path="/admin" component={Admin}/>
	  <Route path="/plant" component={Plant}/>
	</Router>, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
