'use strict';
// Imports
const $ = require('jquery');
global.jQuery = $;
global.Tether = require('tether');
const bootstrap = require('bootstrap');
const React = require('react');
const ReactDOM = require('react-dom');
// Global Vars
const ModuleType = require('./_moduleType.jsx');
const ModuleOptions = require('./_moduleOptions.jsx');
const ModuleResults = require('./_moduleResults.jsx');
// Data
const data = require('../data/cars.json');
for(let i = 0; i < data.models.length; i++) {
	data.models[i].make = data.makes[data.models[i].make];
}
const appModules = {
	type: {
		title: "Body Type",
		module: ModuleType
	},
	options: {
		title: "Options",
		module: ModuleOptions
	},
	results: {
		title: "Results",
		module: ModuleResults
	}
};
// React Components
/**
 * The main page of the web app. The root ReactJS component.
 */
class MainPage extends React.Component {
	/**
	 * Sets the default module to be loaded in to the application. By
	 * default, its the body type module.
	 *
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			title: appModules.type.title,
			module: appModules.type.module,
			settings: undefined
		};
	}
	
	/**
	 * Renders the {@link PageHeader} element as well as the applications
	 * current module.
	 *
	 * @returns {XML} JSX content.
	 */
	render() {
		return (
			<div id="mainPage">
				<PageHeader title={this.state.title} />
				<this.state.module mainPage={this} settings={this.state.settings} />
			</div>
		);
	}
	
	/**
	 * Selects type on the type page and advances web app to next page.
	 *
	 * @param category {string} "body_type" or "lifestyle".
	 * @param value {string} Specific body type or lifestyle.
	 */
	selectType(category, value) {
		this.setState({
			title: appModules.options.title,
			module: appModules.options.module,
			settings: {
				category: category,
				value: value
			}
		});
	}
	
	/**
	 * Advances web app to the final page, in which the search results are
	 * shown.
	 *
	 * @param category {string} "body_type" or "lifestyle".
	 * @param value {string} Specific body type or lifestyle.
	 * @param filters {array} Array of filters to apply to results.
	 */
	search(category, value, filters) {
		this.setState({
			title: appModules.results.title,
			module: appModules.results.module,
			settings: {
				category: category,
				value: value,
				filters: filters,
				data: data
			}
		});
	}
}
/**
 * The header component used for each page of the web app.
 */
class PageHeader extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
	}
	
	/**
	 * Renders the header of the application with the title returned by the
	 * {@link PageHeader#getAppModuleTitle} method.
	 *
	 * @returns {XML} JSX content.
	 */
	render() {
		return (
			<header>
				<img src="media/images/brand/logo.png" alt="AutoTrader Logo" className="logo" />
				<div className="titleContainer">
					<h2>{this.getAppModuleTitle()}</h2>
				</div>
			</header>
		);
	}
	
	/**
	 * Gets the module's title.
	 *
	 * @returns {string} Module title.
	 */
	getAppModuleTitle() {
		return this.props.title;
	}
}
ReactDOM.render(<MainPage />, $('#reactRoot')[0]);