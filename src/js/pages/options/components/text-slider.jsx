import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';

/**
 * A filter element that allows the user to select a value from an array of strings. For example,
 * an array containing the strings "low", "medium", and "high" for a fuel economy filter.
 */
export default class TextSlider extends Component {
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
	 * Renders the text slider element.
	 * @returns {React} - JSX element.
	 */
	render() {
		return (
			<div className="text-slider">
				<h4>{this.props.label}</h4>
				<ReactSlider
					min={0}
					max={this.props.items.length - 1}
					value={this.state.value}
					onChange={this.onChange}
					withBars
					pearling
				>
					<div className="handle-value">{this.props.items[this.state.value]}</div>
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
		this.props.onChange(this.props.items[index].toLowerCase());
	}
}
