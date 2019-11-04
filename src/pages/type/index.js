import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Hammer from 'react-hammerjs';

import * as actions from '../../reducers/actions';

import Type from './components/type';
import Presets from './components/presets';

/**
 * First page of the web app. Contains the body types slider and the presets slider.
 */
class TypePage extends Component {
	/**
	 * @constructor
	 */
	constructor(props) {
		super(props);
		this.handleSwipe = this.handleSwipe.bind(this);
	}

	/**
	 * Renders the type module. Includes rendering the HammerJS module to handle touchscreen
	 * swipes. As well as calling the {@link TypePage#eachType} method to render each of the body
	 * types in the main screen of the application. It also calls for the rendering of the
	 * {@link Presets} object at the bottom of the page.
	 * @returns {React} JSX elements.
	 */
	render() {
		const { types, selectedTypeIndex } = this.props;
		const shortName = types[selectedTypeIndex]
			.toLowerCase()
			.replace(' ', '-');
		return (
			<div id="type" className="page">
				<div className="types-container d-flex mx-3 flex-column align-items-center justify-content-center">
					<Hammer onSwipe={this.handleSwipe}>
						<div className="types position-relative d-flex w-100 align-items-center justify-content-center">
							{this.eachType()}
						</div>
					</Hammer>
					<Link
						className="btn btn-lg btn-primary"
						to={{
							pathname: '/options',
							search: stringify({
								category: 'body-type',
								value: shortName,
							}),
						}}
					>
						Select
					</Link>
				</div>
				<Presets />
			</div>
		);
	}

	/**
	 * Handles the swipe event on the types slider
	 * @param {object} event - Swipe event.
	 */
	handleSwipe(event) {
		const { dispatch } = this.props;
		if (event.direction === 2) {
			dispatch(actions.typeIndexInc());
		} else if (event.direction === 4) {
			dispatch(actions.typeIndexDec());
		}
	}

	/**
	 * This method creates a new {@link Type} element for each value in the "types" component prop.
	 * @returns {React[]} Array of JSX elements to render.
	 */
	eachType() {
		const { dispatch, types } = this.props;
		return types.map((item, i) => (
			<Type
				key={JSON.stringify(item)}
				type={item}
				relativeSelectedIndex={this.getRelativeSelectedIndex(i)}
				nextType={() => dispatch(actions.typeIndexInc())}
				prevType={() => dispatch(actions.typeIndexDec())}
			/>
		));
	}

	/**
	 * Calculates and returns the relative index of the passed in index, to the selected type
	 * index.
	 * @param {number} i - Index to check relative index of.
	 * @returns {number} - Relative index.
	 *
	 * @example
	 * // returns -1
	 * selectedIndex = 1
	 * getTypesCount() = 4
	 * getRelativeSelectedIndex(0)
	 *
	 * @example
	 * // returns 2
	 * selectedIndex = 7
	 * getTypesCount() = 8
	 * getRelativeSelectedIndex(1)
	 */
	getRelativeSelectedIndex(i) {
		const { selectedTypeIndex, types } = this.props;
		const typesCount = types.length;
		let out = i - selectedTypeIndex;
		if (out > typesCount / 2) {
			out -= typesCount;
		} else if (out < -(typesCount / 2)) {
			out += typesCount;
		}
		return out;
	}
}
TypePage.propTypes = {
	dispatch: PropTypes.func.isRequired,
	types: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedTypeIndex: PropTypes.number.isRequired,
};

export default connect((store) => ({
	types: store.type.types,
	selectedTypeIndex: store.type.selectedTypeIndex,
}))(TypePage);
