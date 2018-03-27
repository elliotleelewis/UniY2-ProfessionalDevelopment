import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * Search result element for {@link ResultsPage}.
 */
export default class Result extends PureComponent {
	static propTypes = {
		active: PropTypes.bool.isRequired,
		model: PropTypes.object.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	/**
	 * Renders the result element.
	 * @returns {React} - JSX element.
	 */
	render() {
		return (
			<div
				className={`col-md-4 col-12 result${(this.props.active ? ' active' : '')}`}
				role="button"
				title={`${this.props.model.make.name} ${this.props.model.model}`}
				onClick={this.props.onClick}
			>
				<div className="result-container">
					<div className="result-image" style={{ backgroundImage: `url(${this.getModelImage()})` }} />
					<div className="result-info">
						<div
							className="result-make"
							style={{ backgroundImage: `url(${this.getMakeImage()})` }}
							title={this.props.model.make.name}
							data-toggle="tooltip"
						/>
						<h5 title={this.props.model.model}>{this.props.model.model}</h5>
						<h6 title="Price">Typically £{this.getModelPrice()}</h6>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Gets the image URL for the result's model.
	 * @returns {string} - Image URL.
	 */
	getModelImage() {
		const url = `media/models/${this.props.model.make.name}/${this.props.model.model}.jpg`;
		return url.replace(/\s+/g, '_').toLowerCase();
	}

	/**
	 * Gets the image URL for the result's make's logo.
	 * @returns {string} - Image URL.
	 */
	getMakeImage() {
		const url = `media/makes/${this.props.model.make.name}.png`;
		return url.replace(/\s+/g, '_').toLowerCase();
	}

	/**
	 * Gets the typical price for the result's model.
	 * @returns {string} - Typical model price.
	 */
	getModelPrice() {
		return this.props.model.typical_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
}
