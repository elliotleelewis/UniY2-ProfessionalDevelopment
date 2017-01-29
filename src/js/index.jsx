'use strict';
// Imports
let $ = require('jquery');
global.jQuery = $;
global.Tether = require('tether');
let bootstrap = require('bootstrap');
let React = require('react');
let ReactDOM = require('react-dom');
// Global Vars
let ModuleType = require('./_moduleType.jsx');
let ModuleOptions = require('./_moduleOptions.jsx');
// Data
let data = require('../data/cars.json');
for(let i = 0; i < data.models.length; i++) {
	data.models[i].make = data.makes[data.models[i].make];
}
data = data.models;
console.log(data);
let appModules = {
	type: {
		title: "BODY TYPE",
		module: ModuleType
	},
	options: {
		title: "OPTIONS",
		module: ModuleOptions
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
	 * @param category {string} "body_type" or "lifestyle"
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