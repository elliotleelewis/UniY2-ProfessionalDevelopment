// Imports
let $ = require('jquery');
global.jQuery = $;
global.Tether = require('tether');
let bootstrap = require('bootstrap');
let React = require('react');
let ReactDOM = require('react-dom');
// Global Vars
let ModuleType = require('./moduleType.jsx');
let ModuleOptions = require('./moduleOptions.jsx');
let appStates = {
	type: {
		title: "BODY TYPE",
		object: <ModuleType />
	},
	params: {
		title: "OPTIONS",
		object: <ModuleOptions />
	}
};
// React Components
class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appState: appStates.type
		};
	}
	
	render() {
		return (
			<div id="mainPage">
				<PageHeader appState={this.getAppState()} />
				{this.getAppStateObject()}
			</div>
		);
	}
	
	getAppState() {
		return this.state.appState;
	}
	
	getAppStateObject() {
		return this.getAppState().object;
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
					<h2>{this.getAppStateTitle()}</h2>
				</div>
			</header>
		);
	}
	
	getAppStateTitle() {
		return this.props.appState.title;
	}
}
ReactDOM.render(<MainPage />, $('#reactRoot')[0]);