import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';

/**
 * A filter element that allows the user to select a value from an array of strings. For example,
 * an array containing the strings "low", "medium", and "high" for a fuel economy filter.
 */
export default class TextSlider extends Component {
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
	 * Renders the text slider element.
	 * @returns {React} - JSX element.
	 */
	render() {
		const { items, label } = this.props;
		const { value } = this.state;
		return (
			<div className="text-slider w-100 py-3 text-center">
				<h4 className="m-0 text-white">{label}</h4>
				<ReactSlider
					min={0}
					max={items.length - 1}
					value={value}
					onChange={this.onChange}
					withBars
					pearling
				>
					<div className="handle-value">{items[value]}</div>
				</ReactSlider>
			</div>
		);
	}

	/**
	 * Handles the change events of the text slider.
	 * @param {number} index - Index of the element selected on the slider.
	 */
	onChange(index) {
		this.setState({
			value: index,
		});
		const { items, onChange } = this.props;
		onChange(items[index].toLowerCase());
	}
}
TextSlider.propTypes = {
	label: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
