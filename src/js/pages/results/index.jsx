import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'query-string';

import * as actions from '../../reducers/actions';

import Result from './components/result';

/**
 * The final page of the web app. Where final car results are shown.
 */
@withRouter
@connect((store) => ({
	results: store.results.results,
	sort: store.results.sort,
	selectedResult: store.results.selectedResult,
}))
export default class ResultsPage extends Component {
	static propTypes = {
		results: PropTypes.arrayOf(PropTypes.object).isRequired,
	};

	/**
	 * The constructor also filters and sorts the result set ready for the rest of the module to,
	 * run smoothly.
	 * @constructor
	 * @param props {object} - ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.changeSort = this.changeSort.bind(this);
		const urlParams = parse(this.props.location.search);
		if (!urlParams.category || !urlParams.value) {
			console.log('NOPE');
		}
		// TODO get filters from URL...
		this.props.dispatch(actions.setResultsSettings({
			category: urlParams.category,
			value: urlParams.value,
			filters: [],
		}));
	}

	/**
	 * Renders the results module.
	 * @returns {React} - JSX element.
	 */
	render() {
		if (this.props.results.length === 0) {
			return (
				<div className="module" id="results">
					<div className="container-fluid">
						<div className="row">
							No results found!
						</div>
					</div>
				</div>
			);
		}
		return (
			<div id="results" className="module">
				<div className="container-fluid">
					<div className="row form-group">
						<label className="offset-md-8 col-md-2 col-4" htmlFor="sort">Sort By:</label>
						<select id="sort" className="col-md-2 col-8 form-control" onChange={this.changeSort}>
							<option value="relevancy">Relevancy</option>
							<option value="priceLow">Price Low to High</option>
							<option value="priceHigh">Price High to Low</option>
						</select>
					</div>
					{(this.props.results && this.props.results.length > 0) ? this.getBestResultElement() : null}
					{(this.props.results && this.props.results.length > 0) ? this.getResultElements() : null}
				</div>
			</div>
		);
	}

	/**
	 * Triggers the bootstrap tooltip's once the element has been loaded.
	 */
	componentDidMount() {
		this.props.dispatch(actions.setTitle('Results'));
	}

	componentDidUpdate() {
		$('[data-toggle="tooltip"]').tooltip();
	}

	/**
	 * Handles the click events of the results. It adjusts/resets the selected index state
	 * accordingly.
	 * @param index {number} - Index of the result clicked on.
	 */
	onClick(index) {
		this.props.dispatch(actions.toggleSelectedResult(index));
	}

	/**
	 * Handles the change event of the dropdown menu for sorting the result set.
	 * @param event {object} - Select change event.
	 */
	changeSort(event) {
		this.props.dispatch(actions.changeResultSort(event.target.value));
	}

	/**
	 * Chooses the correct sort function for the models and then applies it to the results.
	 * @param results {array} Results to sort.
	 */
	sort(results) {
		switch (this.props.sort) {
			case 'priceHigh':
				return results.sort((resultA, resultB) => resultB.typical_price - resultA.typical_price);
			case 'priceLow':
				return results.sort((resultA, resultB) => resultA.typical_price - resultB.typical_price);
			default:
				return results.sort((resultA, resultB) => resultA.model.localeCompare(resultB.model));
		}
	}

	/**
	 * Returns the pros/cons of the best result model as little badges that the
	 * user can quickly, and visually see what's good or maybe not so good
	 * about the model.
	 * @returns {React[]} JSX elements array.
	 */
	getBestAttributes() {
		const attributes = [];
		const result = this.getBestResult();
		if (result.seats === '5') {
			attributes.push(<div key={0} className="badge badge-pill badge-success">+ Seats</div>);
		}
		else if (result.seats === '2') {
			attributes.push(<div key={0} className="badge badge-pill badge-danger">- Seats</div>);
		}
		if (result.doors === '5') {
			attributes.push(<div key={1} className="badge badge-pill badge-success">+ Doors</div>);
		}
		else if (result.doors === '2') {
			attributes.push(<div key={1} className="badge badge-pill badge-danger">- Doors</div>);
		}
		if (result.boot_size.toLowerCase() === 'large') {
			attributes.push(<div key={2} className="badge badge-pill badge-success">+ Boot Size</div>);
		}
		else if (result.boot_size.toLowerCase() === 'small') {
			attributes.push(<div key={2} className="badge badge-pill badge-danger">- Boot Size</div>);
		}
		if (result.fuel_consumption.toLowerCase() === 'low') {
			attributes.push(<div key={3} className="badge badge-pill badge-success">+ Fuel Consumption</div>);
		}
		else if (result.fuel_consumption.toLowerCase() === 'considerable') {
			attributes.push(<div key={3} className="badge badge-pill badge-danger">- Fuel Consumption</div>);
		}
		const runningCostValues = ['free', 'low', 'medium', 'considerable'];
		const runningCosts = (
			runningCostValues.indexOf(result.annual_tax.toLowerCase())
			+ runningCostValues.indexOf(result.insurance.toLowerCase())
		) / 2;
		if (runningCosts <= 1.5) {
			attributes.push(<div key={4} className="badge badge-pill badge-success">+ Running Costs</div>);
		}
		else if (runningCosts >= 2.5) {
			attributes.push(<div key={4} className="badge badge-pill badge-danger">- Running Costs</div>);
		}
		if (result.acceleration.toLowerCase() === 'fast') {
			attributes.push(<div key={5} className="badge badge-pill badge-success">+ Speed</div>);
		}
		else if (result.acceleration.toLowerCase() === 'steady') {
			attributes.push(<div key={5} className="badge badge-pill badge-danger">- Speed</div>);
		}
		attributes.sort((attributeA, attributeB) => {
			if (attributeA.props.children.charAt(0) === '-' && attributeB.props.children.charAt(0) === '+') {
				return 1;
			}
			else if (attributeA.props.children.charAt(0) === '+' && attributeB.props.children.charAt(0) === '-') {
				return -1;
			}
			return attributeA.props.children.localeCompare(attributeB.props.children);
		});
		return attributes;
	}

	/**
	 * Returns the best result model's element to render.
	 * @returns {React} JSX Element.
	 */
	getBestResultElement() {
		if (this.props.sort !== 'relevancy') {
			return null;
		}
		const bestResult = this.getBestResult();
		let bestResultMake = `media/makes/${bestResult.make.name}.png`;
		bestResultMake = bestResultMake.replace(/\s+/g, '_').toLowerCase();
		let bestResultModel = `media/models/${bestResult.make.name}/${bestResult.model}.jpg`;
		bestResultModel = bestResultModel.replace(/\s+/g, '_').toLowerCase();
		return (
			<div className="row hidden-sm-down featured-result">
				<div className="col-4 featured-result-image-container">
					<div className="featured-result-image" style={{ backgroundImage: `url(${bestResultModel})` }} />
				</div>
				<div className="col-8 featured-result-info">
					<h3>Best Result</h3>
					<div className="result-info">
						<div
							className="result-make"
							style={{ backgroundImage: `url(${bestResultMake})` }}
							title={bestResult.make.name}
							data-toggle="tooltip"
						/>
						<h4 title={bestResult.model}>{bestResult.model}</h4>
					</div>
					<div className="featured-result-tags">
						{this.getBestAttributes()}
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Generates the result elements to be rendered onto the page. Also adds in
	 * the select dialog into the correct position.
	 * @returns {React[]} Array of JSX elements.
	 */
	getResultElements() {
		let shownSelected = false;
		const results = this.getResults(),
			resultElements = [];
		for (let i = 0; i < results.length; i += 3) {
			const row = [];
			for (let j = 0; j < Math.min(3, results.length - i); j++) {
				row.push((
					<Result
						key={i + j}
						active={i + j === this.props.selectedResult}
						model={results[i + j]}
						onClick={() => this.onClick(i + j)}
					/>
				));
			}
			if (this.props.selectedResult && this.props.selectedResult < i + 3 && !shownSelected) {
				row.splice(
					this.props.selectedResult + (1 - i),
					0,
					(
						<div
							key={results.length}
							className="col-12 selected-result"
							data-arrow-offset={this.props.selectedResult - i}
						>
							<div className="col-12 selected-result-indicator">
								<div className="col-4 triangle-container">
									<div className="triangle" />
								</div>
							</div>
							<div className="col-12 selected-result-info">
								The selected model is {results[this.props.selectedResult].model}
							</div>
						</div>
					),
				);
				shownSelected = !shownSelected;
			}
			resultElements.push((
				<div key={i / 3} className="row">
					{row}
				</div>
			));
		}
		return resultElements;
	}

	/**
	 * Returns the best result model.
	 * @returns {object} - The best result object.
	 */
	getBestResult() {
		return this.getResults()[0];
	}

	/**
	 * Returns the results state.
	 * @returns {object[]} - The results state.
	 */
	getResults() {
		return this.sort(this.props.results);
	}
}
