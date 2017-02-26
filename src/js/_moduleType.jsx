'use strict';
let React = require('react');
let Hammer = require('react-hammerjs');
/**
 * First page of the web app. Contains the body types slider and the presets
 * slider.
 */
class ModuleType extends React.Component {
	/**
	 * Sets the selected type index to a default of 1 and also defines the body
	 * types shown on the web app.
	 *
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			selectedTypeIndex: 1,
			types: [
				'Saloon',
				'Hatchback',
				'SUV',
				'MPV',
				'Estate',
				'Convertible',
				'Coupe',
				'Other'
			]
		}
	}
	
	/**
	 * Renders the type module. Includes rendering the HammerJS module to
	 * handle touchscreen swipes. As well as calling the {@link
		* ModuleType#eachType} method to render each of the body types in the
	 * main screen of the application. It also calls for the rendering of
	 * the {@link Presets} object at the bottom of the page.
	 *
	 * @returns {XML} JSX elements.
	 */
	render() {
		return (
			<div className="module" id="type">
				<div className="types-container">
					<Hammer onSwipe={this.handleSwipe.bind(this)}>
						<div className="types">
							{this.eachType()}
						</div>
					</Hammer>
					<button className="btn btn-lg btn-primary" onClick={this.selectType.bind(this)}>Select</button>
				</div>
				<Presets mainPage={this.props.mainPage} />
			</div>
		);
	}
	
	/**
	 * Handles the swipe event on the types slider. If the direction is left,
	 * then the {@link ModuleType#selectNextType} method is called, otherwise
	 * if the direction is right, it calls the {@link
		* ModuleType#selectPreviousType} method.
	 *
	 * @param event {object} Swipe event.
	 */
	handleSwipe(event) {
		if(event.direction == 2) {
			this.selectNextType();
		}
		else if(event.direction == 4) {
			this.selectPreviousType();
		}
	}
	
	/**
	 * This method creates a new {@link TypeOption} element for each value
	 * returned from the {@link ModuleType#getTypes} method.
	 *
	 * @returns {XML[]} Array of JSX elements to render.
	 */
	eachType() {
		let moduleType = this;
		return this.getTypes().map(function(item, i) {
			return (
				<TypeOption key={i} type={item} relativeSelectedIndex={moduleType.getRelativeSelectedIndex(i)} module={moduleType} />
			);
		});
	}
	
	/**
	 * Calls the {@link MainPage#selectType} method and passes it the focused
	 * body type.
	 */
	selectType() {
		this.props.mainPage.selectType("body_type", this.getSelectedType());
	}
	
	/**
	 * Adjusts the selected type index to select the previous body type.
	 */
	selectPreviousType() {
		let index = this.getSelectedTypeIndex();
		index--;
		if(index < 0) {
			index = this.getTypesCount() - 1;
		}
		this.setState({
			selectedTypeIndex: index
		});
	}
	
	/**
	 * Adjusts the selected type index to select the next body type.
	 */
	selectNextType() {
		let index = this.getSelectedTypeIndex();
		index++;
		if(index >= this.getTypesCount()) {
			index = 0;
		}
		this.setState({
			selectedTypeIndex: index
		});
	}
	
	/**
	 * Calculates and returns the relative index of the passed in index, to the
	 * selected type index.
	 *
	 * @example
	 * // returns -1
	 * selectedIndex = 1
	 * getTypesCount() = 4
	 * getRelativeSelectedIndex(0)
	 *
	 * @example
	 * // returns 2
	 * selectedIndex = 7
	 * getTypesCount() = 8
	 * getRelativeSelectedIndex(1)
	 *
	 * @param i {number} Index to check relative index of.
	 * @returns {number} Relative index.
	 */
	getRelativeSelectedIndex(i) {
		let out = i - this.getSelectedTypeIndex();
		if(out > (this.getTypesCount() / 2)) {
			out -= this.getTypesCount();
		}
		else if(out < -(this.getTypesCount() / 2)) {
			out += this.getTypesCount();
		}
		return out;
	}
	
	/**
	 * Returns the body types array.
	 *
	 * @returns {String[]}
	 */
	getTypes() {
		return this.state.types;
	}
	
	/**
	 * Returns the count of the body types array.
	 *
	 * @returns {Number} Length of body types array.
	 */
	getTypesCount() {
		return this.getTypes().length;
	}
	
	/**
	 * Returns the selected body type.
	 *
	 * @returns {string} Selected body type.
	 */
	getSelectedType() {
		return this.state.types[this.getSelectedTypeIndex()];
	}
	
	/**
	 * Returns the selected body type's index.
	 *
	 * @returns {number} Selected body type index.
	 */
	getSelectedTypeIndex() {
		return this.state.selectedTypeIndex;
	}
}
/**
 * Individual body type option for type slider.
 */
class TypeOption extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
	}
	
	/**
	 * Renders the body type on the body types carousel.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className={"type" + this.getClassName()} onClick={this.getAction()}>
				<svg>
					<title>{this.getType()}</title>
					<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={this.getIconFilepath()} />
				</svg>
				<h5>{this.getType()}</h5>
			</div>
		);
	}
	
	/**
	 * Returns the class name for the body type based on the result of the
	 * {@link TypeOption#getRelativeSelectedIndex} function.
	 *
	 * @returns {string}
	 */
	getClassName() {
		switch(this.getRelativeSelectedIndex()) {
			case -2:
				return " before-pre-selected";
			case -1:
				return " pre-selected";
			case 0:
				return " selected";
			case 1:
				return " post-selected";
			case 2:
				return " after-post-selected";
			default:
				return "";
		}
	}
	
	/**
	 * Binds the correct function to the onClick handler on the body types. If
	 * the type to the left of the selected type is clicked then the {@link
		* ModuleType#selectPreviousType} function is called, otherwise if the
	 * type to the right of the selected type is clicked then the {@link
		* ModuleType#selectNextType} function is called.
	 *
	 * @returns {function} Function to bind.
	 */
	getAction() {
		switch(this.getRelativeSelectedIndex()) {
			case -1:
				return this.props.module.selectPreviousType.bind(this.props.module);
				break;
			case 1:
				return this.props.module.selectNextType.bind(this.props.module);
				break;
		}
	}
	
	/**
	 * Returns the icon filepath for that specific body type.
	 *
	 * @returns {string} Icon filepath.
	 */
	getIconFilepath() {
		return "media/images/icons.svg#icon-" + this.getType().toLowerCase();
	}
	
	/**
	 * Returns the specific body type of this instance of this object.
	 *
	 * @returns {string} Body type.
	 */
	getType() {
		return this.props.type;
	}
	
	/**
	 * Returns the relative selected index of this instance of this object.
	 *
	 * @returns {number} Relative selected index.
	 */
	getRelativeSelectedIndex() {
		return this.props.relativeSelectedIndex;
	}
}
/**
 * Presets slider for bottom of {@link ModuleType}.
 */
class Presets extends React.Component {
	/**
	 * By default, sets the hidden state to be `false`. Also sets the array of
	 * presets to be displayed.
	 *
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		this.state = {
			hidden: false,
			presets: [
				"First Car",
				"City Car",
				"Family Car",
				"Towing",
				"Long Distance",
				"Performance",
				"Off Road"
			]
		};
	}
	
	/**
	 * Renders the presets slider, including the hide button.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<footer>
				<button id="toggle-presets-button" title={this.state.hidden == false ? "Hide" : "Show"} onClick={this.toggleHidden.bind(this)}>
					<i className="material-icons">{"arrow_drop_" + (this.state.hidden == false ? "down" : "up")}</i>
				</button>
				<div className={"presets-container" + (this.state.hidden == false ? "" : " hidden")}>
					<h3>Lifestyle</h3>
					<div className="presets">
						{this.getPresets()}
					</div>
				</div>
			</footer>
		);
	}
	
	/**
	 * Toggles the hidden state of this component.
	 */
	toggleHidden() {
		this.setState({
			hidden: !this.state.hidden
		});
	}
	
	/**
	 * Returns the array of presets to render.
	 *
	 * @returns {XML[]} Array of JSX elements.
	 */
	getPresets() {
		let mainPage = this.props.mainPage;
		return this.state.presets.map(function(item, i) {
			let shortName = item.toLowerCase().replace(" ", "-");
			return (
				<a key={i} className="preset" href="#" onClick={mainPage.selectType.bind(mainPage, "lifestyle", shortName)}>
					<div className="preset-icon">
						<svg>
							<title>{item}</title>
							<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={"media/images/icons.svg#icon-" + shortName} />
						</svg>
					</div>
					<p>{item}</p>
				</a>
			);
		});
	}
}
module.exports = ModuleType;