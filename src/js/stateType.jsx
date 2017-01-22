let React = require('react');
class StateType extends React.Component {
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
					<div className="types">
						{this.eachType()}
					</div>
					<button className="btn btn-lg btn-primary">Select</button>
				</div>
				<Presets />
			</div>
		);
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
				<a id="togglePresetsButton" href="#" title={this.state.hidden == false ? "Hide" : "Show"} onClick={this.toggleHidden.bind(this)}>
					<i className="material-icons">{"arrow_drop_" + (this.state.hidden == false ? "down" : "up")}</i>
				</a>
				<div className={"presetsContainer" + (this.state.hidden == false ? "" : " hidden")}>
					<h3>Presets</h3>
					<div className="presets">
						{this.getPresets()}
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
	
	getPresets() {
		let presets = [
			{
				name: "First Car",
				icon: "first-car"
			},
			{
				name: "City Car",
				icon: "city-car"
			},
			{
				name: "Family Car",
				icon: "family-car"
			},
			{
				name: "Towing",
				icon: "towing"
			},
			{
				name: "Long Distance",
				icon: "long-distance"
			},
			{
				name: "Performance",
				icon: "performance"
			},
			{
				name: "Off Road",
				icon: "off-road"
			}
		];
		return presets.map(function(item, i) {
			return (
				<div key={i} className="preset">
					<div className="presetIcon">
						<svg>
							<title>{item.name}</title>
							<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={"media/images/icons.svg#icon-" + item.icon} />
						</svg>
					</div>
					<p>{item.name}</p>
				</div>
			);
		});
	}
}
module.exports = StateType;