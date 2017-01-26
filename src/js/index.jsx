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
class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appModule: appModules.type
		};
	}
	
	render() {
		return (
			<div id="mainPage">
				<PageHeader title={this.getAppModuleTitle()} />
				{this.getAppModuleObject()}
			</div>
		);
	}
	
	getAppModule() {
		return this.state.appModule;
	}
	
	getAppModuleTitle() {
		return this.getAppModule().title;
	}
	
	getAppModuleObject() {
		return this.getAppModule().object;
	}
}
class PageHeader extends React.Component {
	constructor(props) {
		super(props);
	}
	
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
	
	getAppModuleTitle() {
		return this.props.title;
	}
}
ReactDOM.render(<MainPage />, $('#reactRoot')[0]);