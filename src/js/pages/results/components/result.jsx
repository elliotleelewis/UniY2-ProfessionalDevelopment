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
		let makeUrl = `media/makes/${this.props.model.make.name}.png`;
		makeUrl = makeUrl.replace(/\s+/g, '_').toLowerCase();
		let modelUrl = `media/models/${this.props.model.make.name}/${this.props.model.model}.jpg`;
		modelUrl = modelUrl.replace(/\s+/g, '_').toLowerCase();
		const modelPrice = this.props.model.typical_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return (
			<div
				className={`${(this.props.active ? 'active ' : '')}result col-md-4 col-12 my-3`}
				role="button"
				title={`${this.props.model.make.name} ${this.props.model.model}`}
				onClick={this.props.onClick}
			>
				<div className="result-container h-100">
					<div className="result-image" style={{ backgroundImage: `url(${modelUrl})` }} />
					<div className="result-info d-flex p-2 align-items-center">
						<img
							className="mh-100"
							src={makeUrl}
							alt={this.props.model.make.name}
							title={this.props.model.make.name}
							data-toggle="tooltip"
						/>
						<h5 className="w-100 my-0 ml-2" title={this.props.model.model}>{this.props.model.model}</h5>
						<h6 className="m-0" title="Price">~ £{modelPrice}</h6>
					</div>
				</div>
			</div>
		);
	}
}
