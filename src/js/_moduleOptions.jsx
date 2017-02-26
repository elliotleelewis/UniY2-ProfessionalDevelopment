'use strict';
let React = require('react');
let ReactSlider = require('react-slider');
/**
 * The second page of the web app. Where secondary configuration takes place
 * before results are shown.
 */
class ModuleOptions extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		let filters = [];
		if(this.getSettings().category == "body_type") {
			switch(this.getSettings().value) {
				case "Hatchback":
					filters = [
						{
							type: "doors"
						},
						{
							type: "price",
							settings: {
								min: 0,
								max: 100000,
								defaultValue: [25000, 75000]
							}
						},
						{
							type: "running_costs"
						}
					];
					break;
			}
		}
		else if(this.getSettings().category == "lifestyle") {
			switch(this.getSettings().value) {
				//
			}
		}
		this.state = {
			filters: filters,
			values: []
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
				<div className="filters">
					{this.getFilterElements()}
					<button className="btn btn-lg btn-primary">Search</button>
				</div>
			</div>
		);
	}
	
	/**
	 * Handles the changes in values of the filters and updates the store of
	 * them dynamically.
	 *
	 * @param index The index of the filter whose value has changed.
	 * @param value The new value of the filter.
	 */
	onFilterChange(index, value) {
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
					let defaultMin = (settings.defaultValue) ? settings.defaultValue[0] : settings.min;
					let defaultMax = (settings.defaultValue) ? settings.defaultValue[1] : settings.max;
					let defaultValue = [defaultMin, defaultMax];
					return (
						<RangeSlider key={i} label="Price" prefix="£" min={settings.min} max={settings.max} value={defaultValue} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "seats":
					return (
						<TextSlider key={i} label="Seats" items={["2+", "4+", "5+", "7+"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "doors":
					return (
						<TextSlider key={i} label="Doors" items={["2+", "3+", "4+", "5+"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "boot_size":
					return (
						<TextSlider key={i} label="Boot Size" items={["Small", "Medium", "Large"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "transmission":
					return (
						<TextSlider key={i} label="Transmission" items={["Automatic", "Manual", "Both"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "fuel_consumption":
					return (
						<TextSlider key={i} label="Fuel Consumption" items={["Low", "Medium", "Considerable"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "acceleration":
					return (
						<TextSlider key={i} label="Acceleration" items={["Steady", "Medium", "Fast"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
				case "running_costs":
					return (
						<TextSlider key={i} label="Running Costs" items={["Low", "Medium", "Considerable"]} onChange={moduleOptions.onFilterChange.bind(moduleOptions, i)} />
					);
			}
		});
	}
	
	/**
	 * Returns the correct filters for the body_type/lifestyle selected.
	 *
	 * @example Price Settings
	 *
	 * // (required)
	 * // Minimum possible value.
	 * // Example: 0
	 * int min;
	 *
	 * // (required)
	 * // Maximum possible value.
	 * // Example: 100
	 * int max;
	 *
	 * // (optional)
	 * // Array of minimum and maximum default prices.
	 * // Example: [25, 75]
	 * int[] defaultValue;
	 *
	 * @example Seats Settings
	 *
	 * // No settings for seats.
	 *
	 * @example Doors Settings
	 *
	 * // No settings for doors.
	 *
	 * @example Boot Size Settings
	 *
	 * // No settings for boot size.
	 *
	 * @example Transmission Settings
	 *
	 * // No settings for transmission.
	 *
	 * @example Fuel Consumption Settings
	 *
	 * // No settings for fuel consumption.
	 *
	 * @example Acceleration Settings
	 *
	 * // No settings for acceleration.
	 *
	 * @example Running Costs Settings
	 *
	 * // No settings for running costs.
	 *
	 * @returns {Object[]} Array of filters.
	 */
	getFilters() {
		return this.state.filters;
	}
	
	/**
	 * Returns the settings array.
	 *
	 * @returns {Array}
	 */
	getSettings() {
		return this.props.settings;
	}
}
/**
 * A filter element that allows the user to select a numerical range of values.
 * For example, a price range.
 */
class RangeSlider extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
	}
	
	/**
	 * Handles the change events of the range slider.
	 *
	 * @param value
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
	
	/**
	 * Renders the range slider element.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="range-slider">
				<h4>{this.props.label}</h4>
				<ReactSlider min={this.props.min} max={this.props.max} step={(this.props.max - this.props.min) / 100} value={this.state.value} withBars pearling minDistance={(this.props.max - this.props.min) / 10} onChange={this.onChange.bind(this)}>
					{this.getHandleValues()}
				</ReactSlider>
			</div>
		);
	}
}
/**
 * A filter element that allows the user to select a value from an array of
 * strings. For example, an array containing the strings "low", "medium", and
 * "high" for a fuel economy filter.
 */
class TextSlider extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			value: props.default || Math.round((props.items.length - 1) / 2)
		};
	}
	
	/**
	 * Handles the change events of the text slider.
	 *
	 * @param value
	 */
	onChange(value) {
		this.setState({
			value: value
		});
		this.props.onChange(value);
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
}
module.exports = ModuleOptions;