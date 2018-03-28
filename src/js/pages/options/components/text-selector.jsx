import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * A filter element that allows the user to select a value from an array of strings that don't have
 * a numerical association or an order to them. For example, an array containing the strings
 * "both", "manual", and "automatic" for a transmission filter.
 */
export default class TextSelector extends Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(PropTypes.string).isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	/**
	 * @constructor
	 * @param {object} props - ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			value: props.items.indexOf(props.value),
		};
	}

	/**
	 * Renders the text selector element.
	 * @returns {React} - JSX element.
	 */
	render() {
		return (
			<div className="text-selector w-100 py-3 text-center">
				<h4 className="m-0 text-white">{this.props.label}</h4>
				<div className="items d-flex align-items-center justify-content-center flex-column flex-md-row">
					{this.getItems()}
				</div>
			</div>
		);
	}

	/**
	 * Handles the change events of the text selector.
	 * @param {number} index - Index of the element selected.
	 */
	onChange(index) {
		this.setState({
			value: index,
		});
		this.props.onChange(this.props.items[index].toLowerCase());
	}

	/**
	 * Returns an array of button elements. One for each item in the "items" prop.
	 * @returns {React[]} - Array of JSX elements.
	 */
	getItems() {
		return this.props.items.map((item, i) => (
			<button
				key={i}
				className={`btn btn-${(this.state.value === i) ? '' : 'outline-'}secondary mx-2 mt-3`}
				onClick={() => this.onChange(i)}
			>
				{item}
			</button>
		));
	}
}
