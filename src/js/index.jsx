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
		title: 'Body Type',
		module: ModuleType,
		hash: 'type',
		settings: {
			types: [
				'Saloon',
				'Hatchback',
				'SUV',
				'MPV',
				'Estate',
				'Convertible',
				'Coupe'
			],
			selectedTypeIndex: 1
		}
	},
	options: {
		title: 'Options',
		module: ModuleOptions,
		hash: 'options'
	},
	results: {
		title: 'Results',
		module: ModuleResults,
		hash: 'results'
	}
};
console.log("Modules: ", appModules);
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
		window.location.lasthash = [];
		window.onhashchange = function() {
			//TODO add hash navigation...
		};
		this.state = {
			title: appModules.type.title,
			module: appModules.type.module,
			settings: {
				selectedTypeIndex: appModules.type.settings.selectedTypeIndex,
				types: appModules.type.settings.types
			}
		};
	}
	
	/**
	 * Renders the header as well as the applications current module.
	 *
	 * @returns {XML} JSX content.
	 */
	render() {
		return (
			<div id="main-page">
				<header>
					<img src="media/images/brand/logo.png" alt="AutoTrader Logo" className="logo" />
					<div className="titleContainer">
						<h2>{this.state.title}</h2>
					</div>
				</header>
				<this.state.module mainPage={this} settings={this.state.settings} />
			</div>
		);
	}
	
	/**
	 * Sets web app's current module to the type page, the initial page of the
	 * app.
	 */
	showType(bodyType) {
		this.updateHistory(appModules.type.hash);
		this.setState({
			title: appModules.type.title,
			module: appModules.type.module,
			settings: {
				selectedTypeIndex: (bodyType) ? appModules.type.settings.types.indexOf(bodyType) : appModules.type.settings.selectedTypeIndex,
				types: appModules.type.settings.types
			}
		});
	}
	
	/**
	 * Selects type on the type page and then sets web app's current module to
	 * options page.
	 *
	 * @param category {String} "body_type" or "lifestyle".
	 * @param value {String} Specific body type or lifestyle.
	 */
	showOptions(category, value) {
		this.updateHistory(appModules.options.hash);
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
	 * Sets web app's current module to the results page, in which the search
	 * results are shown.
	 *
	 * @param category {String} "body_type" or "lifestyle".
	 * @param value {String} Specific body type or lifestyle.
	 * @param filters {Array} Array of filters to apply to results.
	 */
	showResults(category, value, filters) {
		this.updateHistory(appModules.results.hash);
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
	
	/**
	 * Updates the browser's history when navigating around the web app.
	 *
	 * @param hash {String} The hash of the new page/module of the web app.
	 */
	updateHistory(hash) {
		window.location.lasthash.push(window.location.hash);
		window.location.hash = hash;
	}
}
ReactDOM.render(<MainPage />, $('#react-root')[0]);