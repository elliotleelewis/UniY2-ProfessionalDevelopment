let React = require('react');
let Hammer = require('react-hammerjs');
class ModuleType extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTypeIndex: 1,
			types: [
				'saloon',
				'hatchback',
				'suv',
				'mpv',
				'estate',
				'convertible',
				'coupe',
				'other'
			]
		}
	}
	
	render() {
		return (
			<div className="state" id="type">
				<div className="typesContainer">
					<Hammer onSwipe={this.handleSwipe.bind(this)}>
						<div className="types">
							{this.eachType()}
						</div>
					</Hammer>
					<button className="btn btn-lg btn-primary">Select</button>
				</div>
				<Presets />
			</div>
		);
	}
	
	handleSwipe(event) {
		if(event.direction == 2) {
			this.selectNextType();
		}
		else if(event.direction == 4) {
			this.selectPreviousType();
		}
	}
	
	eachType() {
		let typeState = this;
		return this.getTypes().map(function(item, i) {
			return (
				<TypeOption key={i} type={item} relativeSelectedIndex={typeState.getRelativeSelectedIndex(i)} state={typeState} />
			);
		});
	}
	
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
	
	getTypes() {
		return this.state.types;
	}
	
	getTypesCount() {
		return this.getTypes().length;
	}
	
	getSelectedTypeIndex() {
		return this.state.selectedTypeIndex;
	}
}
class TypeOption extends React.Component {
	constructor(props) {
		super(props);
	}
	
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
	
	getClassName() {
		switch(this.getRelativeSelectedIndex()) {
			case -2:
				return " beforePreSelected";
				break;
			case -1:
				return " preSelected";
				break;
			case 0:
				return " selected";
				break;
			case 1:
				return " postSelected";
				break;
			case 2:
				return " afterPostSelected";
				break;
			default:
				return "";
				break;
		}
	}
	
	getAction() {
		switch(this.getRelativeSelectedIndex()) {
			case -1:
				return this.props.state.selectPreviousType.bind(this.props.state);
				break;
			case 1:
				return this.props.state.selectNextType.bind(this.props.state);
				break;
		}
	}
	
	getIconFilepath() {
		return "media/images/icons.svg#icon-" + this.getType();
	}
	
	getType() {
		return this.props.type;
	}
	
	getRelativeSelectedIndex() {
		return this.props.relativeSelectedIndex;
	}
}
class Presets extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: false
		};
	}
	
	render() {
		return (
			<footer>
				<a id="togglePresetsButton" href="#" title={this.state.hidden == false ? "Hide" : "Show"} onClick={this.toggleHidden.bind(this)}> <i className="material-icons">{"arrow_drop_" + (this.state.hidden == false ? "down" : "up")}</i> </a>
				<div className={"presetsContainer" + (this.state.hidden == false ? "" : " hidden")}>
					<h3>Lifestyle</h3>
					<div className="presets">
						{Presets.getPresets()}
					</div>
				</div>
			</footer>
		);
	}
	
	toggleHidden() {
		this.setState({
			hidden: !this.state.hidden
		});
	}
	
	static getPresets() {
		let presets = [
			"First Car",
			"City Car",
			"Family Car",
			"Towing",
			"Long Distance",
			"Performance",
			"Off Road"
		];
		return presets.map(function(item, i) {
			return (
				<div key={i} className="preset">
					<div className="presetIcon">
						<svg>
							<title>{item}</title>
							<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={"media/images/icons.svg#icon-" + item.toLowerCase().replace(" ", "-")} />
						</svg>
					</div>
					<p>{item}</p>
				</div>
			);
		});
	}
}
module.exports = ModuleType;