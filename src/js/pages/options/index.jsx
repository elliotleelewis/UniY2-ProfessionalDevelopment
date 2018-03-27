import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { parse } from 'query-string';

import * as actions from '../../reducers/actions';

import RangeSlider from './components/range-slider';
import TextSelector from './components/text-selector';
import TextSlider from './components/text-slider';

/**
 * The second page of the web app. Where secondary configuration takes place
 * before results are shown.
 */
@withRouter
@connect((store) => ({
	category: store.options.category,
	value: store.options.value,
	filters: store.options.filters,
}))
export default class OptionsPage extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
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
		const urlParams = parse(this.props.location.search);
		if (!urlParams.category || !urlParams.value) {
			console.log('NOPE');
		}
		this.props.dispatch(actions.setOptionsSettings(urlParams.category, urlParams.value));
	}

	/**
	 * Renders the options module.
	 * @returns {React} - JSX element.
	 */
	render() {
		return (
			<div id="options" className="module">
				<div className="filters">
					{this.getFilterElements()}
					<Link className="btn btn-lg btn-primary" to={this.getResultUrl()}>Search</Link>
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.props.dispatch(actions.setTitle('Options'));
	}

	getResultUrl() {
		let url = '/results?';
		url += `category=${this.props.category}`;
		url += `&value=${this.props.value}`;
		// TODO add filters...
		return url;
	}

	/**
	 * Handles the changes in values of the filters and updates the store of them dynamically.
	 * @param {number} index - The index of the filter whose value has changed.
	 * @param {string} value - The new value of the filter.
	 */
	onFilterChange(index, value) {
		const val = (typeof value === 'string') ? value.toLowerCase() : value;
		this.props.dispatch(actions.setFilterValue(index, val));
	}

	/**
	 * Returns the correct, configured filter elements for the body_type/lifestyle selected.
	 * @returns {React[]} - Array of filter elements.
	 */
	getFilterElements() {
		return this.props.filters.map((filter, i) => {
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
							value={[settings.defaultValue[0], settings.defaultValue[1]]}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'seats':
					return (
						<TextSlider
							key={filter.type}
							label="Seats"
							items={['2+', '4+', '5+', '7+']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'doors':
					return (
						<TextSlider
							key={filter.type}
							label="Doors"
							items={['2+', '3+', '4+', '5+']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'boot_size':
					return (
						<TextSlider
							key={filter.type}
							label="Boot Size"
							items={['Small', 'Medium', 'Large']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'transmission':
					return (
						<TextSelector
							key={filter.type}
							label="Transmission"
							items={['Both', 'Manual', 'Automatic']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'fuel_consumption':
					return (
						<TextSlider
							key={filter.type}
							label="Fuel Consumption"
							items={['Low', 'Medium', 'Considerable']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'acceleration':
					return (
						<TextSlider
							key={filter.type}
							label="Acceleration"
							items={['Steady', 'Medium', 'Fast']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				case 'running_costs':
					return (
						<TextSlider
							key={filter.type}
							label="Running Costs"
							items={['Low', 'Medium', 'Considerable']}
							value={settings.defaultValue}
							onChange={(value) => this.onFilterChange(i, value)}
						/>
					);
				default:
					return null;
			}
		});
	}
}
