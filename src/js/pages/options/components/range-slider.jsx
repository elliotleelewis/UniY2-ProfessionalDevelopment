import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';

/**
 * A filter element that allows the user to select a numerical range of values. For example,
 * a price range.
 */
export default class RangeSlider extends Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
		prefix: PropTypes.string,
		affix: PropTypes.string,
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		value: PropTypes.arrayOf(PropTypes.number).isRequired,
		onChange: PropTypes.func.isRequired,
	};

	static defaultProps = {
		prefix: '',
		affix: '',
	};

	/**
	 * @constructor
	 * @param {object} props - ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			value: props.value,
		};
	}

	/**
	 * Renders the range slider element.
	 * @returns {React} - JSX element.
	 */
	render() {
		return (
			<div className="range-slider w-100 py-3 text-center">
				<h4 className="m-0 text-white">{this.props.label}</h4>
				<ReactSlider
					min={this.props.min}
					max={this.props.max}
					step={1000}
					value={this.state.value}
					onChange={this.onChange}
					withBars
					pearling
					minDistance={(this.props.max - this.props.min) / 10}
				>
					{this.getHandleValues()}
				</ReactSlider>
			</div>
		);
	}

	/**
	 * Handles the change events of the range slider.
	 * @param {number[]} value
	 */
	onChange(value) {
		this.setState({
			value,
		});
		this.props.onChange(value);
	}

	/**
	 * Returns an array of elements corresponding to the current values of the range slider.
	 * @returns {React[]} - Array of JSX elements.
	 */
	getHandleValues() {
		const { prefix, affix } = this.props;
		return this.state.value.map((value) => {
			const val = ((prefix) || '') + value + ((affix) || '');
			return (
				<div key={val} className="handle-value">{val}</div>
			);
		});
	}
}
