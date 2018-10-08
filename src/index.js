/* eslint-disable global-require */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';

import TypePage from './pages/type/index';
import OptionsPage from './pages/options/index';
import ResultsPage from './pages/results/index';
import reducers from './reducers/index';

import './css/index.scss';

let middleware = [
	//
];
if (process.env.NODE_ENV !== 'production') {
	const { composeWithDevTools } = require('redux-devtools-extension');
	const { logger } = require('redux-logger');
	middleware = composeWithDevTools(applyMiddleware(
		...middleware,
		logger,
	));
}
else {
	middleware = applyMiddleware(...middleware);
}

class App extends Component {
	static propTypes = {
		title: PropTypes.string,
	};

	static defaultProps = {
		title: '',
	};

	render() {
		const { title } = this.props;
		return (
			<div id="main-page" className="d-flex w-100 h-100 flex-column">
				<header className="d-flex p-3 flex-column align-items-center">
					<img className="w-100 mh-100" src={`${process.env.PUBLIC_URL}/media/brand/logo.png`} alt="AutoTrader" />
					<div className="w-100 mt-2 text-center">
						<h2 className="m-0">{title}</h2>
					</div>
				</header>
				<Route exact path="/" component={TypePage} />
				<Route path="/options" component={OptionsPage} />
				<Route path="/results" component={ResultsPage} />
			</div>
		);
	}
}

const ConnectedApp = withRouter(connect((store) => ({
	title: store.app.title,
}))(App));

render(
	<Provider store={createStore(reducers, middleware)}>
		<Router>
			<ConnectedApp />
		</Router>
	</Provider>,
	document.getElementById('react-root'),
);
