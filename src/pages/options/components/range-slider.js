import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';

/**
 * A filter element that allows the user to select a numerical range of values. For example,
 * a price range.
 */
export default class RangeSlider extends Component {
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
		const { label, min, max, prefix, affix } = this.props;
		const { value } = this.state;
		const renderThumb = (val) => (prefix || '') + val + (affix || '');
		return (
			<div className="range-slider w-100 py-3 text-center">
				<h4 className="m-0 text-white">{label}</h4>
				<ReactSlider
					min={min}
					max={max}
					step={1000}
					value={value}
					onChange={this.onChange}
					pearling
					minDistance={(max - min) / 10}
					renderThumb={(props, state) => (
						<div {...props}>
							<div className="thumb-value">
								{renderThumb(state.valueNow)}
							</div>
						</div>
					)}
				/>
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
		const { onChange } = this.props;
		onChange(value);
	}
}
RangeSlider.propTypes = {
	label: PropTypes.string.isRequired,
	prefix: PropTypes.string,
	affix: PropTypes.string,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	value: PropTypes.arrayOf(PropTypes.number).isRequired,
	onChange: PropTypes.func.isRequired,
};
RangeSlider.defaultProps = {
	prefix: '',
	affix: '',
};
