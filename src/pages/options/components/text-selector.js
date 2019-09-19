import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * A filter element that allows the user to select a value from an array of strings that don't have
 * a numerical association or an order to them. For example, an array containing the strings
 * "both", "manual", and "automatic" for a transmission filter.
 */
export default class TextSelector extends Component {
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
		const { label } = this.props;
		return (
			<div className="text-selector w-100 py-3 text-center">
				<h4 className="m-0 text-white">{label}</h4>
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
		const { items, onChange } = this.props;
		onChange(items[index].toLowerCase());
	}

	/**
	 * Returns an array of button elements. One for each item in the "items" prop.
	 * @returns {React[]} - Array of JSX elements.
	 */
	getItems() {
		const { items } = this.props;
		const { value } = this.state;
		return items.map((item, i) => (
			<button
				key={item}
				className={`btn btn-${
					value === i ? '' : 'outline-'
				}secondary mx-2 mt-3`}
				type="button"
				onClick={() => this.onChange(i)}
			>
				{item}
			</button>
		));
	}
}
TextSelector.propTypes = {
	label: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
