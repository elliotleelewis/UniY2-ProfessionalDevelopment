import PropTypes from 'prop-types';
import { parse } from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../../reducers/actions';

import RangeSlider from './components/range-slider';
import TextSelector from './components/text-selector';
import TextSlider from './components/text-slider';

/**
 * The second page of the web app. Where secondary configuration takes place
 * before results are shown.
 */
class OptionsPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		location: PropTypes.shape({
			search: PropTypes.string.isRequired,
		}).isRequired,
		category: PropTypes.string,
		value: PropTypes.string,
		filters: PropTypes.arrayOf(PropTypes.object).isRequired,
	};

	static defaultProps = {
		category: null,
		value: null,
	};

	/**
	 * @constructor
	 * @param {object} props - ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	/**
	 * Renders the options module.
	 * @returns {React} - JSX element.
	 */
	render() {
		return (
			<div id="options" className="page justify-content-center px-4 pb-3">
				<div className="container d-flex flex-column align-items-center">
					{this.getFilterElements()}
					<Link className="btn btn-lg btn-primary my-3" to={this.getResultUrl()}>Search</Link>
				</div>
			</div>
		);
	}

	componentDidMount() {
		const { dispatch, location } = this.props;
		dispatch(actions.setTitle('Options'));
		const urlParams = parse(location.search);
		if (!urlParams.category || !urlParams.value) {
			console.log('NOPE');
		}
		dispatch(actions.setOptionsSettings(urlParams.category, urlParams.value));
	}

	getResultUrl() {
		const { category, value } = this.props;
		let url = '/results?';
		url += `category=${category}`;
		url += `&value=${value}`;
		url += `&filters=${JSON.stringify(this.getValues())}`;
		return url;
	}

	/**
	 * Handles the changes in values of the filters and updates the store of them dynamically.
	 * @param {number} index - The index of the filter whose value has changed.
	 * @param {string} value - The new value of the filter.
	 */
	onFilterChange(index, value) {
		const { dispatch } = this.props;
		const val = (typeof value === 'string') ? value.toLowerCase() : value;
		dispatch(actions.setFilterValue(index, val));
	}

	/**
	 * Returns the correct, configured filter elements for the body-type/preset selected.
	 * @returns {React[]} - Array of filter elements.
	 */
	getFilterElements() {
		const { filters } = this.props;
		return filters.map((filter, i) => {
			const { settings } = filter;
			switch (filter.type) {
				case 'price':
					return (
						<RangeSlider
							key={filter.type}
							label="Price"
							prefix="£"
							min={settings.min}
							max={settings.max}
							value={[filter.value[0], filter.value[1]]}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'seats':
					return (
						<TextSlider
							key={filter.type}
							label="Seats"
							items={['2+', '4+', '5+', '7+']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'doors':
					return (
						<TextSlider
							key={filter.type}
							label="Doors"
							items={['2+', '3+', '4+', '5+']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'boot_size':
					return (
						<TextSlider
							key={filter.type}
							label="Boot Size"
							items={['Small', 'Medium', 'Large']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'transmission':
					return (
						<TextSelector
							key={filter.type}
							label="Transmission"
							items={['Both', 'Manual', 'Automatic']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'fuel_consumption':
					return (
						<TextSlider
							key={filter.type}
							label="Fuel Consumption"
							items={['Low', 'Medium', 'Considerable']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'acceleration':
					return (
						<TextSlider
							key={filter.type}
							label="Acceleration"
							items={['Steady', 'Medium', 'Fast']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'running_costs':
					return (
						<TextSlider
							key={filter.type}
							label="Running Costs"
							items={['Low', 'Medium', 'Considerable']}
							value={filter.value}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				default:
					return null;
			}
		});
	}

	getValues() {
		const { filters } = this.props;
		return filters.map((filter) => ({
			type: filter.type,
			value: filter.value,
		}));
	}
}
export default withRouter(connect((store) => ({
	category: store.options.category,
	value: store.options.value,
	filters: store.options.filters,
}))(OptionsPage));
