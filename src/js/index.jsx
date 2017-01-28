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
		object: <ModuleType />
	},
	options: {
		title: "OPTIONS",
		object: <ModuleOptions />
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
			appModule: appModules.type
		};
	}
	
	/**
	 * Renders the {@link PageHeader} element as well as the applications
	 * module described by the {@link MainPage#getAppModule} method.
	 *
	 * @returns {XML} JSX content.
	 */
	render() {
		return (
			<div id="mainPage">
				<PageHeader title={this.getAppModuleTitle()} /> {this.getAppModuleObject()}
			</div>
		);
	}
	
	/**
	 * Returns the selected module for the application.
	 *
	 * @returns {object} Selected module.
	 */
	getAppModule() {
		return this.state.appModule;
	}
	
	/**
	 * Returns the selected module's title.
	 *
	 * @returns {string} Selected module's title.
	 */
	getAppModuleTitle() {
		return this.getAppModule().title;
	}
	
	/**
	 * Returns the selected module's object.
	 *
	 * @returns {XML} JSX content.
	 */
	getAppModuleObject() {
		return this.getAppModule().object;
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