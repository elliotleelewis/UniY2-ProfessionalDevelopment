/* eslint-disable global-require */
import {
	ConnectedRouter as Router,
	routerMiddleware,
} from 'connected-react-router';
import { createHashHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import TypePage from './pages/type/index';
import OptionsPage from './pages/options/index';
import ResultsPage from './pages/results/index';
import createRootReducer from './reducers/index';

import './css/index.scss';

const history = createHashHistory({
	basename: process.env.PUBLIC_URL,
});

let middleware = [routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
	const { composeWithDevTools } = require('redux-devtools-extension');
	const { logger } = require('redux-logger');
	middleware = composeWithDevTools(applyMiddleware(...middleware, logger));
} else {
	middleware = applyMiddleware(...middleware);
}

render(
	<Provider store={createStore(createRootReducer(history), middleware)}>
		<Router history={history}>
			<div id="main-page" className="d-flex w-100 h-100 flex-column">
				<header className="d-flex p-3 flex-column align-items-center">
					<img
						className="w-100 mh-100"
						src={`${process.env.PUBLIC_URL}/media/brand/logo.png`}
						alt="AutoTrader"
					/>
				</header>
				<Route exact path="/" component={TypePage} />
				<Route path="/options" component={OptionsPage} />
				<Route path="/results" component={ResultsPage} />
			</div>
		</Router>
	</Provider>,
	document.getElementById('react-root'),
);
