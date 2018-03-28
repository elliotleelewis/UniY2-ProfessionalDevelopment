import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { stringify } from 'query-string';

import * as actions from '../../../reducers/actions';

/**
 * Presets slider for bottom of {@link TypePage}.
 */
@withRouter
@connect((store) => ({
	hidden: store.type.presetsHidden,
	presets: store.type.presets,
}))
export default class Presets extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		hidden: PropTypes.bool.isRequired,
		presets: PropTypes.arrayOf(PropTypes.string).isRequired,
	};

	/**
	 * Renders the presets slider, including the hide button.
	 * @returns {React} JSX element.
	 */
	render() {
		return (
			<footer className="d-flex mt-2 flex-column align-items-center">
				<button
					id="toggle-presets-button"
					className="d-flex px-3 py-1 border-0 text-white"
					title={this.props.hidden ? 'Show' : 'Hide'}
					onClick={() => this.props.dispatch(actions.togglePresets())}
				>
					<i className="material-icons">{`arrow_drop_${!this.props.hidden ? 'down' : 'up'}`}</i>
				</button>
				<div className={`${!this.props.hidden ? '' : 'hidden '}presets-container d-flex w-100 p-3 flex-column`}>
					<h3 className="mb-3 text-center">Lifestyle</h3>
					<div className="presets d-flex w-100 m-auto">
						{this.getPresets()}
					</div>
				</div>
			</footer>
		);
	}

	/**
	 * Returns the array of presets to render.
	 * @returns {React[]} Array of JSX elements.
	 */
	getPresets() {
		return this.props.presets.map((item) => {
			const shortName = item.toLowerCase().replace(' ', '-');
			return (
				<Link
					key={shortName}
					className="preset"
					to={{
						pathname: '/options',
						search: stringify({
							category: 'lifestyle',
							value: shortName,
						}),
					}}
				>
					<div className="preset-icon d-flex justify-content-center">
						<svg className="mw-100 mh-100">
							<title>{item}</title>
							<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`media/icons.svg#icon-${shortName}`} />
						</svg>
					</div>
					<p className="mt-2 mb-0 text-center text-white">{item}</p>
				</Link>
			);
		});
	}
}
