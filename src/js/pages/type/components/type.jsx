import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../reducers/actions';

/**
 * Individual body type option for type slider.
 */
@withRouter
@connect()
export default class Type extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
		relativeSelectedIndex: PropTypes.number.isRequired,
	};

	/**
	 * Renders the body type on the body types carousel.
	 * @returns {React} - JSX element.
	 */
	render() {
		let action;
		switch (this.props.relativeSelectedIndex) {
			case -1:
				action = actions.typeIndexDec();
				break;
			case 1:
				action = actions.typeIndexInc();
				break;
			default:
				break;
		}
		return (
			<div
				className={`type ${this.getClassName()}`}
				role="button"
				onClick={() => this.props.dispatch(action)}
				tabIndex={this.getTabIndex()}
			>
				<svg>
					<title>{this.props.type}</title>
					<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={this.getIconFilepath()} />
				</svg>
				<h5>{this.props.type}</h5>
			</div>
		);
	}

	/**
	 * Returns the class name for the body type based on the value of the "relativeSelectedIndex"
	 * component prop.
	 * @returns {string}
	 */
	getClassName() {
		return [
			'before-pre-selected',
			'pre-selected',
			'selected',
			'post-selected',
			'after-post-selected',
		][this.props.relativeSelectedIndex + 2];
	}

	/**
	 * Returns the icon filepath for that specific body type.
	 * @returns {string} - Icon filepath.
	 */
	getIconFilepath() {
		return `media/icons.svg#icon-${this.props.type.toLowerCase()}`;
	}

	/**
	 * Returns the tab index of this instance of this object.
	 * @returns {number} - Tab index.
	 */
	getTabIndex() {
		return (Math.abs(this.props.relativeSelectedIndex) === 1) ? 0 : -1;
	}
}
