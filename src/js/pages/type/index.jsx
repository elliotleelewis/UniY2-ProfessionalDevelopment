import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Hammer from 'react-hammerjs';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

import * as actions from '../../reducers/actions';

import Type from './components/type';
import Presets from './components/presets';

/**
 * First page of the web app. Contains the body types slider and the presets slider.
 */
@withRouter
@connect((store) => ({
	types: store.type.types,
	selectedTypeIndex: store.type.selectedTypeIndex,
}))
export default class TypePage extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		types: PropTypes.arrayOf(PropTypes.string).isRequired,
		selectedTypeIndex: PropTypes.number.isRequired,
	};

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
		return (
			<div id="type" className="module">
				<div className="types-container">
					<Hammer onSwipe={this.handleSwipe}>
						<div className="types">
							{this.eachType()}
						</div>
					</Hammer>
					<Link
						className="btn btn-lg btn-primary"
						to={{
							pathname: '/options',
							search: stringify({
								category: 'body_type',
								value: this.props.types[this.props.selectedTypeIndex],
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

	componentDidMount() {
		this.props.dispatch(actions.setTitle('Types'));
	}

	/**
	 * Handles the swipe event on the types slider
	 * @param {object} event - Swipe event.
	 */
	handleSwipe(event) {
		if (event.direction === 2) {
			this.props.dispatch(actions.TYPE_INDEX_INC);
		}
		else if (event.direction === 4) {
			this.props.dispatch(actions.TYPE_INDEX_DEC);
		}
	}

	/**
	 * This method creates a new {@link Type} element for each value in the "types" component prop.
	 * @returns {React[]} Array of JSX elements to render.
	 */
	eachType() {
		return this.props.types.map((item, i) => (
			<Type
				key={JSON.stringify(item)}
				type={item}
				relativeSelectedIndex={this.getRelativeSelectedIndex(i)}
				nextType={() => this.props.dispatch(actions.typeIndexInc())}
				prevType={() => this.props.dispatch(actions.typeIndexDec())}
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
		const typesCount = this.props.types.length;
		let out = i - this.props.selectedTypeIndex;
		if (out > (typesCount / 2)) {
			out -= typesCount;
		}
		else if (out < -(typesCount / 2)) {
			out += typesCount;
		}
		return out;
	}
}
