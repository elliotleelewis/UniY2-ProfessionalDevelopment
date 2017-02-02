'use strict';
let React = require('react');
/**
 * The second page of the web app. Where secondary configuration takes place
 * before results are shown.
 */
class ModuleOptions extends React.Component {
	/**
	 * @constructor
	 * @param props ReactJS props.
	 */
	constructor(props) {
		super(props);
	}
	
	/**
	 * Renders the options module.
	 *
	 * @returns {XML} JSX element.
	 */
	render() {
		return (
			<div className="module" id="options" />
		);
	}
}
module.exports = ModuleOptions;