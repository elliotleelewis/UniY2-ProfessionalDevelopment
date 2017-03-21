'use strict';
// Imports
const bootstrap = require('bootstrap'),
	React = require('react');
// React Components
/**
 * The final page of the web app. Where final car results are shown.
 */
class ModuleResults extends React.Component {
	/**
	 * The constructor also filters and sorts the result set ready for the rest
	 * of the module to run smoothly.
	 *
	 * @constructor
	 * @param props {Object} ReactJS props.
	 */
	constructor(props) {
		super(props);
		console.log("Results Settings: ", props.settings);
		let settings = props.settings;
		let results = settings.data.models.slice();
		main: for(let i = 0; i < results.length; i++) {
			let result = results[i];
			if(settings.category === "body_type" && settings.value !== result.body_type) {
				results.splice(i, 1);
				i--;
				continue;
			}
			for(let j = 0; j < settings.filters.length; j++) {
				let filter = settings.filters[j];
				let values, filterNumber;
				switch(filter.filter) {
					case "doors":
						let value = filter.value.charAt(0);
						if(Number(result.doors) < Number(value)) {
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "price":
						let min = filter.value[0];
						let max = filter.value[1];
						if(result.max_price < min || result.min_price > max) {
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "running_costs":
						values = ["free", "low", "medium", "considerable"];
						filterNumber = values.indexOf(filter.value.toLowerCase());
						let resultAnnualTax = values.indexOf(result.annual_tax.toLowerCase());
						let resultInsurance = values.indexOf(result.insurance.toLowerCase());
						if(resultAnnualTax > filterNumber || resultInsurance > filterNumber) {
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "boot_size":
						values = ["small", "medium", "large"];
						filterNumber = values.indexOf(filter.value.toLowerCase());
						let resultBootSize = values.indexOf(result.boot_size.toLowerCase());
						if(resultBootSize > filterNumber) {
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "transmission":
						if( filter.value.toLowerCase() !== "both" && filter.value.toLowerCase() !== result.transmission.toLowerCase()) {
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "seats":
						let filterSeats = filter.value.charAt(0);
						if(Number(result.seats) < Number(filterSeats)){
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "fuel_consumption":
						values = ["low", "medium", "considerable"];
						let filterValues = ["minimal", "medium", "considerable"];
						filterNumber = values.indexOf(filter.value.toLowerCase());
						let resultFuelConsumption = filterValues.indexOf(result.fuel_consumption.toLowerCase());
						if(resultFuelConsumption > filterNumber){
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
					case "acceleration":
						values = ["steady", "medium", "fast"];
						filterNumber = values.indexOf(filter.value.toLowerCase());
						let resultAcceleration = values.indexOf(result.acceleration.toLowerCase());
						if(resultAcceleration > filterNumber){
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
				}
				
			}
		}
		this.state = {
			results: this.sort(results, "relevancy"),
			selectedIndex: undefined,
			sort: "relevancy"
		};
	}
	
	/**
	 * Renders the results module.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		if(this.state.results.length === 0) {
			return (
				<div className="module" id="results">
					<div className="container-fluid">
						<div className="row form-group">
							<button className="col-md-2 col-4 btn btn-secondary" onClick={this.goBack.bind(this)}>Back</button>
						</div>
						<div className="row">
							No results found!
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="module" id="results">
				<div className="container-fluid">
					<div className="row form-group">
						<button className="col-md-2 col-4 btn btn-secondary" onClick={this.goBack.bind(this)}>Back</button>
						<label className="offset-md-6 col-md-2 col-4">Sort By:</label>
						<select className="col-md-2 col-8 form-control" onChange={this.changeSort.bind(this)}>
							<option value="relevancy">Relevancy</option>
							<option value="priceLow">Price Low to High</option>
							<option value="priceHigh">Price High to Low</option>
						</select>
					</div>
					{this.getBestResultElement()}
					{this.getResultElements()}
				</div>
			</div>
		)
	}
	
	/**
	 * Triggers the bootstrap tooltip's once the element has been loaded.
	 */
	componentDidMount() {
		$('[data-toggle="tooltip"]').tooltip();
	}
	
	/**
	 * Calls the {@link MainPage#showOptions} function to switch the web app to
	 * the options module.
	 */
	goBack() {
		let settings = this.props.settings;
		let params = {
			category: settings.category,
			value: settings.value
		};
		this.props.mainPage.updatePage(this.props.mainPage.getAppModules().options.hash, params);
	}
	
	/**
	 * Handles the click events of the results. It adjusts/resets the selected
	 * index state accordingly.
	 *
	 * @param index {Number} Index of the result clicked on.
	 */
	onClick(index) {
		if(this.state.selectedIndex === index)
			this.setState({
				selectedIndex: undefined
			});
		else
			this.setState({
				selectedIndex: index
			});
	}
	
	/**
	 * Handles the change event of the dropdown menu for sorting the result set.
	 *
	 * @param event {Object} Select change event.
	 */
	changeSort(event) {
		this.setState({
			sort: event.target.value
		});
	}
	
	/**
	 * Chooses the correct sort function for the models and then applies it to
	 * the results.
	 *
	 * @param results {Array} Results to sort.
	 * @param sortAlgorithm {String} Optional sorting algorithm to override
	 *     state.
	 */
	sort(results, sortAlgorithm) {
		let sortFunction = function(resultA, resultB) {
			//TODO finish relevancy sort...
			return resultA.model.localeCompare(resultB.model);
		};
		switch(sortAlgorithm || this.state.sort) {
			case "priceLow":
				sortFunction = function(resultA, resultB) {
					return resultA.typical_price - resultB.typical_price;
				};
				break;
			case "priceHigh":
				sortFunction = function(resultA, resultB) {
					return resultB.typical_price - resultA.typical_price;
				};
				break;
		}
		return results.sort(sortFunction);
	}
	
	/**
	 * TODO
	 *
	 * @returns {XML[]} JSX elements array.
	 */
	getBestAttributes() {
		let attributes = [];
		let result = this.getBestResult();
		if(result.seats === "5") {
			attributes.push(
				<div key={0} className="badge badge-pill badge-success">+ Seats</div>
			);
		}
		else if(result.seats === "2") {
			attributes.push(
				<div key={0} className="badge badge-pill badge-danger">- Seats</div>
			);
		}
		if(result.doors === "5") {
			attributes.push(
				<div key={1} className="badge badge-pill badge-success">+ Doors</div>
			);
		}
		else if(result.doors === "2") {
			attributes.push(
				<div key={1} className="badge badge-pill badge-danger">- Doors</div>
			);
		}
		if(result.boot_size.toLowerCase() === "large") {
			attributes.push(
				<div key={2} className="badge badge-pill badge-success">+ Boot Size</div>
			);
		}
		else if(result.boot_size.toLowerCase() === "small") {
			attributes.push(
				<div key={2} className="badge badge-pill badge-danger">- Boot Size</div>
			);
		}
		if(result.fuel_consumption.toLowerCase() === "low") {
			attributes.push(
				<div key={3} className="badge badge-pill badge-success">+ Fuel Consumption</div>
			);
		}
		else if(result.fuel_consumption.toLowerCase() === "considerable") {
			attributes.push(
				<div key={3} className="badge badge-pill badge-danger">- Fuel Consumption</div>
			);
		}
		let runningCostValues = ["free", "low", "medium", "considerable"];
		let runningCosts = (runningCostValues.indexOf(result.annual_tax.toLowerCase()) + runningCostValues.indexOf(result.insurance.toLowerCase())) / 2;
		if(runningCosts <= 1.5) {
			attributes.push(
				<div key={4} className="badge badge-pill badge-success">+ Running Costs</div>
			);
		}
		else if(runningCosts >= 2.5) {
			attributes.push(
				<div key={4} className="badge badge-pill badge-danger">- Running Costs</div>
			);
		}
		if(result.acceleration.toLowerCase() === "fast") {
			attributes.push(
				<div key={5} className="badge badge-pill badge-success">+ Speed</div>
			);
		}
		else if(result.acceleration.toLowerCase() === "steady") {
			attributes.push(
				<div key={5} className="badge badge-pill badge-danger">- Speed</div>
			);
		}
		attributes.sort(function(attributeA, attributeB) {
			if(attributeA.props.children.charAt(0) == "-" && attributeB.props.children.charAt(0) == "+")
				return 1;
			else if(attributeA.props.children.charAt(0) == "+" && attributeB.props.children.charAt(0) == "-")
				return -1;
			else
				return attributeA.props.children.localeCompare(attributeB.props.children);
		});
		return attributes;
	}
	
	/**
	 * TODO
	 *
	 * @returns {XML} JSX Element.
	 */
	getBestResultElement() {
		if(this.state.sort === "relevancy") {
			let bestResult = this.getBestResult();
			let bestResultMake = "media/makes/" + bestResult.make.name + ".png";
			bestResultMake = bestResultMake.replace(/\s+/g, '_').toLowerCase();
			let bestResultModel = "media/models/" + bestResult.make.name + "/" + bestResult.model + ".jpg";
			bestResultModel = bestResultModel.replace(/\s+/g, '_').toLowerCase();
			return (
				<div className="row hidden-sm-down featured-result">
					<div className="col-4 featured-result-image-container">
						<div className="featured-result-image" style={{backgroundImage: "url(" + bestResultModel + ")"}} />
					</div>
					<div className="col-8 featured-result-info">
						<h3>Best Result</h3>
						<div className="result-info">
							<div className="result-make" style={{backgroundImage: "url(" + bestResultMake + ")"}} title={bestResult.make.name} data-toggle="tooltip" />
							<h4 title={bestResult.model}>{bestResult.model}</h4>
						</div>
						<div className="featured-result-tags">
							{this.getBestAttributes()}
						</div>
					</div>
				</div>
			);
		}
	}
	
	/**
	 * Generates the result elements to be rendered onto the page. Also adds in
	 * the select dialog into the correct position.
	 *
	 * @returns {XML[]} Array of JSX elements.
	 */
	getResultElements() {
		let moduleResults = this;
		let shownSelected = false;
		let resultElements = [];
		for(let i = 0; i < this.getResults().length; i += 3) {
			let row = [];
			for(let j = 0; j < Math.min(3, this.getResults().length - i); j++) {
				row.push(
					<Result key={i + j} active={i + j === this.getSelectedIndex()} model={this.getResults()[i + j]} onClick={moduleResults.onClick.bind(this, i + j)} />
				);
			}
			if(this.getSelectedIndex() < i + 3 && !shownSelected) {
				row.splice(this.getSelectedIndex() - i + 1, 0,
					<div key={this.getResults().length} className="col-12 selected-result" data-arrow-offset={this.getSelectedIndex() - i}>
						<div className="col-12 selected-result-indicator">
							<div className="col-4 triangle-container">
								<div className="triangle" />
							</div>
						</div>
						<div className="col-12 selected-result-info">
							The selected model is {this.getResults()[this.getSelectedIndex()].model}
						</div>
					</div>
				);
				shownSelected = !shownSelected;
			}
			resultElements.push(
				<div key={i / 3} className="row">
					{row}
				</div>
			);
		}
		return resultElements;
	}
	
	/**
	 * TODO
	 *
	 * @returns {Object} The best result object.
	 */
	getBestResult() {
		return this.getResults()[0];
	}
	
	/**
	 * Returns the results state.
	 *
	 * @returns {Object[]} The results state.
	 */
	getResults() {
		return this.sort(this.state.results);
	}
	
	/**
	 * Returns the selected index state.
	 *
	 * @returns {Object[]} The selected index state.
	 */
	getSelectedIndex() {
		return this.state.selectedIndex;
	}
}
ModuleResults.propTypes = {
	mainPage: React.PropTypes.object.isRequired,
	settings: React.PropTypes.shape({
		category: React.PropTypes.string.isRequired,
		value: React.PropTypes.string.isRequired,
		filters: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		data: React.PropTypes.shape({
			makes: React.PropTypes.object.isRequired,
			models: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
		}).isRequired
	}).isRequired
};
/**
 * Search result element for {@link ModuleResults}.
 */
class Result extends React.Component {
	/**
	 * @constructor
	 * @param props {Object} ReactJS props.
	 */
	constructor(props) {
		super(props);
	}
	
	/**
	 * Renders the result element.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className={"col-md-4 col-12 result" + (this.props.active ? " active" : "")} title={this.getModel().make.name + " " + this.getModel().model} onClick={this.props.onClick}>
				<div className="result-container">
					<div className="result-image" style={{backgroundImage: "url(" + this.getModelImage() + ")"}} />
					<div className="result-info">
						<div className="result-make" style={{backgroundImage: "url(" + this.getMakeImage() + ")"}} title={this.getModel().make.name} data-toggle="tooltip" />
						<h5 title={this.getModel().model}>{this.getModel().model}</h5>
						<h6 title="Price">Typically £{this.getModelPrice()}</h6>
					</div>
				</div>
			</div>
		);
	}
	
	/**
	 * Gets the image URL for the result's model.
	 *
	 * @returns {String} Image URL.
	 */
	getModelImage() {
		let url = "media/models/" + this.getModel().make.name + "/" + this.getModel().model + ".jpg";
		return url.replace(/\s+/g, '_').toLowerCase();
	}
	
	/**
	 * Gets the image URL for the result's make's logo.
	 *
	 * @returns {String} Image URL.
	 */
	getMakeImage() {
		let url = "media/makes/" + this.getModel().make.name + ".png";
		return url.replace(/\s+/g, '_').toLowerCase();
	}
	
	/**
	 * Gets the typical price for the result's model.
	 *
	 * @returns {String} Typical model price.
	 */
	getModelPrice() {
		return this.getModel().typical_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	/**
	 * Gets the result's model.
	 *
	 * @returns {String} Result's model.
	 */
	getModel() {
		return this.props.model;
	}
}
Result.propTypes = {
	active: React.PropTypes.bool.isRequired,
	model: React.PropTypes.object.isRequired,
	onClick: React.PropTypes.func.isRequired
};
module.exports = ModuleResults;