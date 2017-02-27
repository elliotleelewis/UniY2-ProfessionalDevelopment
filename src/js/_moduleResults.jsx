'use strict';
const React = require('react');
/**
 * The final page of the web app. Where final car results are shown.
 */
class ModuleResults extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
		console.log("Settings: ", this.props.settings);
	}
	
	/**
	 * Renders the results module.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="module" id="results">
				These are some results...
			</div>
		)
	}
}
module.exports = ModuleResults;