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
		//TODO finish off filtering models...
		main: for(let i = 0; i < results.length; i++) {
			let result = results[i];
			if(settings.category === "body_type" && settings.value !== result.body_type) {
				results.splice(i, 1);
				i--;
				continue;
			}
			for(let j = 0; j < settings.filters.length; j++) {
				let filter = settings.filters[j];
				switch(filter.filter) {
					case "doors":
						let value = filter.value.charAt(0);
						if(Number(result.doors) < Number(value)) {
							results.splice(i, 1);
							i--;
							continue main;
						}
						break;
				}
			}
		}
		results.sort(this.sortRelevancy);
		this.state = {
			results: results,
			selectedIndex: undefined
		};
	}
	
	/**
	 * Renders the results module.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		let temp = this.getResults().slice();
		temp.sort(this.sortRelevancy);
		let bestResult = temp[0];
		let bestResultMake = "media/makes/" + bestResult.make.name + ".png";
		bestResultMake = bestResultMake.replace(/\s+/g, '_').toLowerCase();
		let bestResultModel = "media/models/" + bestResult.make.name + "/" + bestResult.model + ".jpg";
		bestResultModel = bestResultModel.replace(/\s+/g, '_').toLowerCase();
		return (
			<div className="module" id="results">
				<div className="container-fluid">
					<div className="row form-group">
						<button className="col-md-2 col-4 btn btn-secondary" onClick={this.goBack.bind(this)}>Back</button>
						<label className="offset-md-6 col-md-2 col-4">Sort By:</label>
						<select className="col-md-2 col-8 form-control" onChange={this.sort.bind(this)}>
							<option value="relevancy">Relevancy</option>
							<option value="priceLow">Price Low to High</option>
							<option value="priceHigh">Price High to Low</option>
						</select>
					</div>
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
								{/*TODO add pros/cons here... */}
								<div className="badge badge-pill badge-success">+ Fuel Consumption</div>
								<div className="badge badge-pill badge-success">+ Acceleration</div>
							</div>
						</div>
					</div>
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
	 * Chooses the correct sort function and then applies it to the results.
	 *
	 * @param event {Object} Select change event.
	 */
	sort(event) {
		let sortFunction = this.sortRelevancy;
		switch(event.target.value) {
			case "priceLow":
				sortFunction = this.sortPriceLowHigh;
				break;
			case "priceHigh":
				sortFunction = this.sortPriceHighLow;
				break;
		}
		let temp = this.getResults().slice();
		temp.sort(sortFunction);
		this.setState({
			results: temp
		});
	}
	
	/**
	 * Relevancy sort function. Sorts results based on their relevance to the
	 * filters applied.
	 *
	 * @param resultA {Object} Result to sort.
	 * @param resultB {Object} Result to sort.
	 * @returns {Number} Sort result.
	 */
	sortRelevancy(resultA, resultB) {
		//TODO finish relevancy sort...
		return resultA.model.localeCompare(resultB.model);
	}
	
	/**
	 * Price low to high sort function. Sorts results into ascending price
	 * order.
	 *
	 * @param resultA {Object} Result to sort.
	 * @param resultB {Object} Result to sort.
	 * @returns {Number} Sort result.
	 */
	sortPriceLowHigh(resultA, resultB) {
		return resultA.typical_price - resultB.typical_price;
	}
	
	/**
	 * Price high to low sort function. Sorts results into descending price
	 * order.
	 *
	 * @param resultA {Object} Result to sort.
	 * @param resultB {Object} Result to sort.
	 * @returns {Number} Sort result.
	 */
	sortPriceHighLow(resultA, resultB) {
		return resultB.typical_price - resultA.typical_price;
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
								<div className="triangle"/>
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
	 * Returns the results state.
	 *
	 * @returns {Object[]} The results state.
	 */
	getResults() {
		return this.state.results;
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