'use strict';
// Imports
global.$ = require('jquery');
global.jQuery = $;
global.Tether = require('tether');
const bootstrap = require('bootstrap'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	ModuleType = require('./_moduleType.jsx'),
	ModuleOptions = require('./_moduleOptions.jsx'),
	ModuleResults = require('./_moduleResults.jsx');
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
		let mainPage = this;
		window.onhashchange = function() {
			mainPage.setState(mainPage.getPage());
		};
		this.state = this.getPage();
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
	 * Updates the browser's history when navigating around the web app.
	 *
	 * @param hash {String} The hash of the new page/module of the web app.
	 * @param params {Object} The parameters of the new page/module of the web
	 *     app.
	 */
	updatePage(hash, params) {
		let paramString = "p=" + hash;
		for(let param in params) {
			if(params.hasOwnProperty(param) && typeof params[param] !== "undefined") {
				if(typeof params[param] === "object")
					paramString += "&" + param + "=" + JSON.stringify(params[param]);
				else
					paramString += "&" + param + "=" + params[param];
			}
		}
		window.location.lasthash.push(window.location.hash);
		window.location.hash = paramString;
	}
	
	/**
	 * Gets called when the hash of the URL changes in the browser. This
	 * function works out what page to load and then returns the correct page
	 * with appropriate params already applied taken in via the URL attributes.
	 */
	getPage() {
		let appModules = this.getAppModules();
		let temp = window.location.hash.substr(1).split("&");
		let params = {};
		for(let i = 0; i < temp.length; i++) {
			let param = temp[i].split("=");
			params[param[0]] = param[1];
		}
		switch(params.p) {
			case "options":
				return {
					title: appModules.options.title,
					hash: appModules.options.hash,
					module: appModules.options.module,
					settings: {
						category: params.category,
						value: params.value
					}
				};
			case "results":
				return {
					title: appModules.results.title,
					hash: appModules.results.hash,
					module: appModules.results.module,
					settings: {
						category: params.category,
						value: params.value,
						filters: JSON.parse(params.filters),
						data: this.getData()
					}
				};
			default:
				return {
					title: appModules.type.title,
					hash: appModules.type.hash,
					module: appModules.type.module,
					settings: {
						selectedTypeIndex: (params.bodyType) ? appModules.type.settings.types.indexOf(params.bodyType) : appModules.type.settings.selectedTypeIndex,
						types: appModules.type.settings.types
					}
				};
		}
	}
	
	/**
	 * Returns the AppModules object.
	 *
	 * @returns {Object} AppModules object.
	 */
	getAppModules() {
		return this.props.appModules;
	}
	
	/**
	 * Returns the Data object.
	 *
	 * @returns {Object} Data object.
	 */
	getData() {
		let temp = this.props.data;
		for(let i = 0; i < temp.models.length; i++) {
			temp.models[i].make = temp.makes[temp.models[i].make];
		}
		return temp;
	}
}
MainPage.propTypes = {
	appModules: React.PropTypes.object.isRequired,
	data: React.PropTypes.shape({
		makes: React.PropTypes.object.isRequired,
		models: React.PropTypes.array.isRequired
	}).isRequired
};
ReactDOM.render(<MainPage appModules={{
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
}} data={require('../data/cars.json')} />, $('#react-root')[0]);