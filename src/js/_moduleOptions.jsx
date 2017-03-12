'use strict';
// Imports
const React = require('react'),
	ReactSlider = require('react-slider');
// React Components
/**
 * The second page of the web app. Where secondary configuration takes place
 * before results are shown.
 */
class ModuleOptions extends React.Component {
	/**
	 * @constructor
	 * @param props {Object} ReactJS props.
	 */
	constructor(props) {
		super(props);
		console.log("Options Settings: ", props.settings);
		let filters = [];
		if(this.getSettings().category === "body_type") {
			switch(this.getSettings().value) {
				case "Hatchback":
					filters = [
						{
							type: "doors",
							settings: {
								defaultValue: "5+"
							}
						},
						{
							type: "price",
							settings: {
								min: 0,
								max: 55000,
								defaultValue: [0, 45000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						}
					];
					break;
				case "SUV":
					filters = [
						
						{
							type: "price",
							settings: {
								min: 0,
								max: 50000,
								defaultValue: [0, 32000]
							}
						},
						{
							type: "boot_size",
							settings: {
								defaultValue: "Large"
							}
						},
						{
							type: "transmission",
							settings: {
								defaultValue: "Both"
							}
						}
					];
					break;
				case "MPV":
					filters = [
						
						{
							type: "seats",
							settings: {
								defaultValue: "5+"
							}
						},
						{
							type: "price",
							settings: {
								min: 0,
								max: 60000,
								defaultValue: [0, 40000]
							}
						},
						{
							type: "boot_size",
							settings: {
								defaultValue: "Medium"
							}
						},
						{
							type: "fuel_consumption",
							settings: {
								defaultValue: "Low"
							}
						},
					];
					break;
				case "Estate":
					filters = [
						
						{
							type: "seats",
							settings: {
								defaultValue: "5+"
							}
						},
						{
							type: "price",
							settings: {
								min: 0,
								max: 50000,
								defaultValue: [0, 35000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						
					];
					break;
				case "Convertible":
					filters = [
						{
							type: "seats",
							settings: {
								// needs to be able to limit to max 5
								defaultValue: "2+"
							}
						},
						{
							type: "price",
							settings: {
								min: 0,
								max: 80000,
								defaultValue: [0, 35000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "transmission",
							settings: {
								defaultValue: "Both"
							}
						}
					];
					break;
				case "Coupe":
					filters = [
						{
							type: "seats",
							settings: {
								defaultValue: "5+"
							}
						},
						{
							type: "price",
							settings: {
								min: 0,
								max: 200000,
								defaultValue: [0, 80000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						
					];
					break;
				case "Saloon":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 70000,
								defaultValue: [0, 50000]
							}
						},
						{
							type: "fuel_consumption",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						
					];
					break;
			}
		}
		else if(this.getSettings().category === "lifestyle") {
			switch(this.getSettings().value) {
				//need to filter the lifestyles in similar format as above
				case "first-car":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 50000,
								defaultValue: [0, 25000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "transmission",
							settings: {
								defaultValue: "Automatic"
							}
						}
					];
					break;
				case "city-car":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 90000,
								defaultValue: [1000, 30000]
							}
						},
						{
							type: "fuel_consumption",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						}
					];
					break;
				case "family-car":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 30000,
								defaultValue: [0, 30000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "seats",
							settings: {
								defaultValue: "5+"
							}
						}
					
						
					];
					break;
				case "towing":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 30000,
								defaultValue: [0, 30000]
							}
						},
						{
							type: "fuel_consumption",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "boot_size",
							settings: {
								defaultValue: "Medium"
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						}
						
					];
					break;
				case "long-distance":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 30000,
								defaultValue: [0, 30000]
							}
						},
						
						{
							type: "fuel_consumption",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "boot_size",
							settings: {
								defaultValue: "Medium"
							}
						}
						
					];
					break;
				case "performance":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 30000,
								defaultValue: [0, 30000]
							}
						},
						{
							type: "running_costs",
							settings: {
								defaultValue: "Low"
							}
						},
						{
							type: "transmission",
							settings: {
								defaultValue: "Automatic"
							}
						}
					];
					break;
				case "off-road":
					filters = [
						{
							type: "price",
							settings: {
								min: 0,
								max: 30000,
								defaultValue: [0, 30000]
							}
						},
						{
							type: "boot_size",
							settings: {
								defaultValue: "Medium"
							}
						},
						{
							type: "transmission",
							settings: {
								defaultValue: "Automatic"
							}
						}
					];
					break;
			}
		}
		let values = [];
		for(let i = 0; i < filters.length; i++) {
			values.push({
				filter: filters[i].type,
				value: filters[i].settings.defaultValue
			});
		}
		this.state = {
			filters: filters,
			values: values
		};
	}
	
	/**
	 * Renders the options module.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="module" id="options">
				<div className="container-fluid">
					<div className="row">
						<button className="col-md-2 col-4 btn btn-secondary" onClick={this.goBack.bind(this)}>Back</button>
					</div>
				</div>
				<div className="filters">
					{this.getFilterElements()}
					<button className="btn btn-lg btn-primary" onClick={this.showResults.bind(this)}>Search</button>
				</div>
			</div>
		);
	}
	
	/**
	 * Calls the {@link MainPage#updatePage} function. Switches the web app to
	 * the type module.
	 */
	goBack() {
		let settings = this.getSettings();
		let params = {
			bodyType: (settings.category === "body_type") ? settings.value : undefined
		};
		this.props.mainPage.updatePage(this.props.mainPage.getAppModules().type.hash, params);
	}
	
	/**
	 * Calls the {@link MainPage#showResults} function. Switches the web app to
	 * the results module.
	 */
	showResults() {
		let filters = this.state.values.slice(0);
		for(let i = 0; i < filters.length; i++) {
			if(typeof filters[i] === "undefined") {
				filters.splice(i, 1);
				i--;
			}
		}
		let settings = this.getSettings();
		let params = {
			category: settings.category,
			value: settings.value,
			filters: filters
		};
		this.props.mainPage.updatePage(this.props.mainPage.getAppModules().results.hash, params);
	}
	
	/**
	 * Handles the changes in values of the filters and updates the store of
	 * them dynamically.
	 *
	 * @param index {Number} The index of the filter whose value has changed.
	 * @param value {String} The new value of the filter.
	 */
	onFilterChange(index, value) {
		if(typeof value === "string") {
			value = value.toLowerCase();
		}
		let temp = this.state.values;
		while(temp.length < index + 1) {
			temp.push(undefined);
		}
		temp[index] = {
			filter: this.getFilters()[index].type,
			value: value
		};
		this.setState({
			values: temp
		});
	}
	
	/**
	 * Returns the correct, configured filter elements for the
	 * body_type/lifestyle selected.
	 *
	 * @returns {XML[]} Array of filter elements.
	 */
	getFilterElements() {
		let moduleOptions = this;
		return this.getFilters().map(function(filter, i) {
			let settings = filter.settings;
			switch(filter.type) {
				case "price":
					return (
						<RangeSlider key={i} label="Price" prefix="£" min={settings.min} max={settings.max} value={[settings.defaultValue[0], settings.defaultValue[1]]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "seats":
					return (
						<TextSlider key={i} label="Seats" items={["2+", "4+", "5+", "7+"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "doors":
					return (
						<TextSlider key={i} label="Doors" items={["2+", "3+", "4+", "5+"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "boot_size":
					return (
						<TextSlider key={i} label="Boot Size" items={["Small", "Medium", "Large"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "transmission":
					return (
						<TextSelector key={i} label="Transmission" items={["Both", "Manual", "Automatic"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "fuel_consumption":
					return (
						<TextSlider key={i} label="Fuel Consumption" items={["Low", "Medium", "Considerable"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "acceleration":
					return (
						<TextSlider key={i} label="Acceleration" items={["Steady", "Medium", "Fast"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "running_costs":
					return (
						<TextSlider key={i} label="Running Costs" items={["Low", "Medium", "Considerable"]} value={settings.defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
			}
		});
	}
	
	/**
	 * Returns the correct filters for the body_type/lifestyle selected.
	 *
	 * @example Price Settings
	 *
	 * // Minimum possible value.
	 * // Example: 0
	 * int min;
	 *
	 * // Maximum possible value.
	 * // Example: 100
	 * int max;
	 *
	 * // Array of default minimum and maximum prices.
	 * // Example: [25, 75]
	 * int[] defaultValue;
	 *
	 * @example Seats Settings
	 *
	 * // Default number of seats option.
	 * // Example: "4+"
	 * string defaultValue;
	 *
	 * @example Doors Settings
	 *
	 * // Default number of doors option.
	 * // Example: "5+"
	 * string defaultValue;
	 *
	 * @example Boot Size Settings
	 *
	 * // Default boot size option.
	 * // Example: "Medium"
	 * string defaultValue;
	 *
	 * @example Transmission Settings
	 *
	 * // Default transmission option.
	 * // Example: "Both"
	 * string defaultValue;
	 *
	 * @example Fuel Consumption Settings
	 *
	 * // Default fuel consumption option.
	 * // Example: "Low"
	 * string defaultValue;
	 *
	 * @example Acceleration Settings
	 *
	 * // Default acceleration option.
	 * // Example: "Fast"
	 * string defaultValue;
	 *
	 * @example Running Costs Settings
	 *
	 * // Default running costs option.
	 * // Example: "Considerable"
	 * string defaultValue;
	 *
	 * @returns {Object[]} Array of filters.
	 */
	getFilters() {
		return this.state.filters;
	}
	
	/**
	 * Returns the settings array.
	 *
	 * @returns {Array} The settings.
	 */
	getSettings() {
		return this.props.settings;
	}
}
ModuleOptions.propTypes = {
	mainPage: React.PropTypes.object.isRequired,
	settings: React.PropTypes.shape({
		category: React.PropTypes.string.isRequired,
		value: React.PropTypes.string.isRequired
	}).isRequired
};
/**
 * A filter element that allows the user to select a numerical range of values.
 * For example, a price range.
 */
class RangeSlider extends React.Component {
	/**
	 * @constructor
	 * @param props {Object} ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
	}
	
	/**
	 * Renders the range slider element.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="range-slider">
				<h4>{this.props.label}</h4>
				<ReactSlider min={this.props.min} max={this.props.max} step={1000} value={this.state.value} withBars pearling minDistance={(this.props.max - this.props.min) / 10} onChange={this.onChange.bind(this)}>
					{this.getHandleValues()}
				</ReactSlider>
			</div>
		);
	}
	
	/**
	 * Handles the change events of the range slider.
	 *
	 * @param value {Number[]}
	 */
	onChange(value) {
		this.setState({
			value: value
		});
		this.props.onChange(value);
	}
	
	/**
	 * Returns an array of elements corresponding to the current values of the
	 * range slider.
	 *
	 * @returns {XML[]} Array of JSX elements.
	 */
	getHandleValues() {
		let prefix = this.props.prefix;
		let affix = this.props.affix;
		return this.state.value.map(function(value, i) {
			return (
				<div className="handle-value" key={i}>{((prefix) ? prefix : "") + value + ((affix) ? affix : "")}</div>
			);
		});
	}
}
RangeSlider.propTypes = {
	label: React.PropTypes.string.isRequired,
	prefix: React.PropTypes.string,
	affix: React.PropTypes.string,
	min: React.PropTypes.number.isRequired,
	max: React.PropTypes.number.isRequired,
	value: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	onChange: React.PropTypes.func.isRequired
};
/**
 * A filter element that allows the user to select a value from an array of
 * strings. For example, an array containing the strings "low", "medium", and
 * "high" for a fuel economy filter.
 */
class TextSlider extends React.Component {
	/**
	 * @constructor
	 * @param props {Object} ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			value: props.items.indexOf(props.value)
		};
	}
	
	/**
	 * Renders the text slider element.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="text-slider">
				<h4>{this.props.label}</h4>
				<ReactSlider min={0} max={this.props.items.length - 1} value={this.state.value} withBars pearling onChange={this.onChange.bind(this)}>
					<div className="handle-value">{this.props.items[this.state.value]}</div>
				</ReactSlider>
			</div>
		);
	}
	
	/**
	 * Handles the change events of the text slider.
	 *
	 * @param index {Number} Index of the element selected on the slider.
	 */
	onChange(index) {
		this.setState({
			value: index
		});
		this.props.onChange(this.props.items[index].toLowerCase());
	}
}
TextSlider.propTypes = {
	label: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	value: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};
/**
 * A filter element that allows the user to select a value from an array of
 * strings that don't have a numerical association or an order to them. For
 * example, an array containing the strings "both", "manual", and "automatic"
 * for a transmission filter.
 */
class TextSelector extends React.Component {
	/**
	 * @constructor
	 * @param props {Object} ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			value: props.items.indexOf(props.value)
		};
	}
	
	/**
	 * Renders the text selector element.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="text-selector">
				<h4>{this.props.label}</h4>
				<div className="items">
					{this.getItems()}
				</div>
			</div>
		);
	}
	
	/**
	 * Handles the change events of the text selector.
	 *
	 * @param index {Number} Index of the element selected.
	 */
	onChange(index) {
		this.setState({
			value: index
		});
		this.props.onChange(this.props.items[index].toLowerCase());
	}
	
	/**
	 * Returns an array of button elements. One for each item in the "items"
	 * prop.
	 *
	 * @returns {XML[]} Array of JSX elements.
	 */
	getItems() {
		let textSelector = this;
		return this.props.items.map(function(item, i) {
			return (
				<button key={i} className={"btn btn-" + ((textSelector.state.value === i) ? "" : "outline-") + "secondary"} onClick={textSelector.onChange.bind(textSelector, i)}>{item}</button>
			);
		});
	}
}
TextSelector.propTypes = {
	label: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	value: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};
module.exports = ModuleOptions;