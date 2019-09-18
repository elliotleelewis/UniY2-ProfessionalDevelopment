import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

/**
 * Search result element for {@link ResultsPage}.
 */
export default class Result extends PureComponent {
	static propTypes = {
		active: PropTypes.bool.isRequired,
		model: PropTypes.shape({
			make: PropTypes.object.isRequired,
			model: PropTypes.string.isRequired,
			body_type: PropTypes.string.isRequired,
			min_price: PropTypes.string.isRequired,
			max_price: PropTypes.string.isRequired,
			typical_price: PropTypes.string.isRequired,
			seats: PropTypes.string.isRequired,
			doors: PropTypes.string.isRequired,
			boot_size: PropTypes.string.isRequired,
			transmission: PropTypes.string.isRequired,
			fuel_consumption: PropTypes.string.isRequired,
			acceleration: PropTypes.string.isRequired,
			insurance: PropTypes.string.isRequired,
			annual_tax: PropTypes.string.isRequired,
			data_name: PropTypes.string.isRequired,
		}).isRequired,
		onClick: PropTypes.func.isRequired,
	};

	/**
	 * Renders the result element.
	 * @returns {React} - JSX element.
	 */
	render() {
		const { active, model, onClick } = this.props;
		const makeUrl = `${process.env.PUBLIC_URL}/media/makes/${model.make.data_name}.png`;
		const modelUrl = `${process.env.PUBLIC_URL}/media/models/${model.make.data_name}/${model.data_name}.jpg`;
		const modelPrice = model.typical_price.replace(
			/\B(?=(\d{3})+(?!\d))/g,
			',',
		);
		return (
			<button
				className={`${
					active ? 'active ' : ''
				}result col-md-4 col-12 my-3 border-0 bg-transparent text-white`}
				title={`${model.make.name} ${model.model}`}
				type="button"
				onClick={onClick}
			>
				<div className="result-container h-100 bg-trans">
					<div
						className="result-image h-75 bg-trans"
						style={{ backgroundImage: `url(${modelUrl})` }}
					/>
					<div className="result-info h-25 d-flex p-2 align-items-center">
						<img
							id={`result-make-${model.make.data_name}-${model.data_name}`}
							className="mh-100"
							src={makeUrl}
							alt={model.make.name}
							title={model.make.name}
						/>
						<UncontrolledTooltip
							target={`result-make-${model.make.data_name}-${model.data_name}`}
						>
							{model.make.name}
						</UncontrolledTooltip>
						<h5 className="w-100 my-0 ml-2" title={model.model}>
							{model.model}
						</h5>
						<h6
							className="m-0"
							title="Price"
						>{`~ £${modelPrice}`}</h6>
					</div>
				</div>
			</button>
		);
	}
}
