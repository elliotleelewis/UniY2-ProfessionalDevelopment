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
		dispatch: PropTypes.func.isRequired,
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
			<div id="results" className="module px-4 pb-4">
				<div className="container-fluid">
					<div className="form-group form-inline d-flex">
						<label className="d-flex my-0 ml-auto align-items-center" htmlFor="sort">
							Sort By:
							<select id="sort" className="form-control ml-2" onChange={this.changeSort}>
								<option value="relevancy">Relevancy</option>
								<option value="priceLow">Price Low to High</option>
								<option value="priceHigh">Price High to Low</option>
							</select>
						</label>
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
		const urlParams = parse(this.props.location.search);
		if (!urlParams.category || !urlParams.value) {
			console.log('NOPE');
		}
		this.props.dispatch(actions.setResultsSettings({
			category: urlParams.category,
			value: urlParams.value,
			filters: urlParams.filters ? JSON.parse(urlParams.filters) : [],
		}));
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
			attributes.push(<div key={0} className="badge badge-pill badge-success mx-2 mt-2">+ Seats</div>);
		}
		else if (result.seats === '2') {
			attributes.push(<div key={0} className="badge badge-pill badge-danger mx-2 mt-2">- Seats</div>);
		}
		if (result.doors === '5') {
			attributes.push(<div key={1} className="badge badge-pill badge-success mx-2 mt-2">+ Doors</div>);
		}
		else if (result.doors === '2') {
			attributes.push(<div key={1} className="badge badge-pill badge-danger mx-2 mt-2">- Doors</div>);
		}
		if (result.boot_size.toLowerCase() === 'large') {
			attributes.push(<div key={2} className="badge badge-pill badge-success mx-2 mt-2">+ Boot Size</div>);
		}
		else if (result.boot_size.toLowerCase() === 'small') {
			attributes.push(<div key={2} className="badge badge-pill badge-danger mx-2 mt-2">- Boot Size</div>);
		}
		if (result.fuel_consumption.toLowerCase() === 'low') {
			attributes.push(<div key={3} className="badge badge-pill badge-success mx-2 mt-2">+ Fuel Consumption</div>);
		}
		else if (result.fuel_consumption.toLowerCase() === 'considerable') {
			attributes.push(<div key={3} className="badge badge-pill badge-danger mx-2 mt-2">- Fuel Consumption</div>);
		}
		const runningCostValues = ['free', 'low', 'medium', 'considerable'];
		const runningCosts = (
			runningCostValues.indexOf(result.annual_tax.toLowerCase())
			+ runningCostValues.indexOf(result.insurance.toLowerCase())
		) / 2;
		if (runningCosts <= 1.5) {
			attributes.push(<div key={4} className="badge badge-pill badge-success mx-2 mt-2">+ Running Costs</div>);
		}
		else if (runningCosts >= 2.5) {
			attributes.push(<div key={4} className="badge badge-pill badge-danger mx-2 mt-2">- Running Costs</div>);
		}
		if (result.acceleration.toLowerCase() === 'fast') {
			attributes.push(<div key={5} className="badge badge-pill badge-success mx-2 mt-2">+ Speed</div>);
		}
		else if (result.acceleration.toLowerCase() === 'steady') {
			attributes.push(<div key={5} className="badge badge-pill badge-danger mx-2 mt-2">- Speed</div>);
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
			<div className="featured-result row m-0 mb-3">
				<div className="featured-result-image-container col-4 h-100">
					<div className="featured-result-image h-100" style={{ backgroundImage: `url(${bestResultModel})` }} />
				</div>
				<div className="col-8 d-flex m-0 py-3 flex-column">
					<h4 className="m-0 text-center">Best Result:</h4>
					<div className="d-flex h-100 p-3 flex-column align-items-center justify-content-center">
						<div className="d-flex align-items-center">
							<img
								className="featured-result-make mh-100"
								src={bestResultMake}
								alt={bestResult.make.name}
								title={bestResult.make.name}
								data-toggle="tooltip"
							/>
							<h3 className="my-0 ml-3" title={bestResult.model}>{bestResult.model}</h3>
						</div>
						<div className="d-flex flex-wrap align-items-center justify-content-center">
							{this.getBestAttributes()}
						</div>
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
			if (this.props.selectedResult !== null && this.props.selectedResult < i + 3 && !shownSelected) {
				row.splice(
					this.props.selectedResult + (1 - i),
					0,
					(
						<div
							key={results.length}
							className="selected-result col-12 mb-3"
							data-arrow-offset={this.props.selectedResult - i}
						>
							<div className="col-12 d-flex p-0">
								<div className="triangle-container col-4 d-flex my-auto justify-content-center">
									<div className="triangle" />
								</div>
							</div>
							<div className="selected-result-info col-12 d-flex align-items-center justify-content-center">
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
