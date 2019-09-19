import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../reducers/actions';

/**
 * Presets slider for bottom of {@link TypePage}.
 */
class Presets extends Component {
	/**
	 * Renders the presets slider, including the hide button.
	 * @returns {React} JSX element.
	 */
	render() {
		const { dispatch, hidden } = this.props;
		return (
			<footer className="d-flex mt-2 flex-column align-items-center">
				<button
					className="d-flex px-3 py-1 border-0 bg-trans text-white"
					title={hidden ? 'Show' : 'Hide'}
					type="button"
					onClick={() => dispatch(actions.togglePresets())}
				>
					<i className="material-icons">{`arrow_drop_${
						!hidden ? 'down' : 'up'
					}`}</i>
				</button>
				<div
					className={`${
						!hidden ? '' : 'hidden '
					}presets-container d-flex w-100 p-3 flex-column bg-trans`}
				>
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
		const { presets } = this.props;
		return presets.map((item) => {
			const shortName = item.toLowerCase().replace(' ', '-');
			return (
				<Link
					key={shortName}
					className="preset"
					to={{
						pathname: '/options',
						search: stringify({
							category: 'preset',
							value: shortName,
						}),
					}}
				>
					<div className="preset-icon d-flex justify-content-center">
						<svg className="mw-100 mh-100">
							<title>{item}</title>
							<use
								xmlnsXlink="http://www.w3.org/1999/xlink"
								xlinkHref={`${process.env.PUBLIC_URL}/media/icons.svg#icon-${shortName}`}
							/>
						</svg>
					</div>
					<p className="mt-2 mb-0 text-center text-white">{item}</p>
				</Link>
			);
		});
	}
}
Presets.propTypes = {
	dispatch: PropTypes.func.isRequired,
	hidden: PropTypes.bool.isRequired,
	presets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect((store) => ({
	hidden: store.type.presetsHidden,
	presets: store.type.presets,
}))(Presets);
