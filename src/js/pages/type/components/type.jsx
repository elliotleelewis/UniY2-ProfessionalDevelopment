import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * Individual body type option for type slider.
 */
export default class Type extends PureComponent {
	static propTypes = {
		type: PropTypes.string.isRequired,
		relativeSelectedIndex: PropTypes.number.isRequired,
		nextType: PropTypes.func.isRequired,
		prevType: PropTypes.func.isRequired,
	};

	/**
	 * Renders the body type on the body types carousel.
	 * @returns {React} - JSX element.
	 */
	render() {
		if (Math.abs(this.props.relativeSelectedIndex) !== 1) {
			return (
				<div className={`type ${this.getClassName()}`}>
					<svg>
						<title>{this.props.type}</title>
						<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={this.getIconFilepath()} />
					</svg>
					<h5>{this.props.type}</h5>
				</div>
			);
		}
		return (
			<div
				className={`type ${this.getClassName()}`}
				role="button"
				onClick={(this.props.relativeSelectedIndex === 1) ? this.props.nextType : this.props.prevType}
				tabIndex={0}
			>
				<svg>
					<title>{this.props.type}</title>
					<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={this.getIconFilepath()} />
				</svg>
				<h5>{this.props.type}</h5>
			</div>
		);
	}

	/**
	 * Returns the class name for the body type based on the value of the "relativeSelectedIndex"
	 * component prop.
	 * @returns {string}
	 */
	getClassName() {
		return [
			'before-pre-selected',
			'pre-selected',
			'selected',
			'post-selected',
			'after-post-selected',
		][this.props.relativeSelectedIndex + 2];
	}

	/**
	 * Returns the icon filepath for that specific body type.
	 * @returns {string} - Icon filepath.
	 */
	getIconFilepath() {
		return `media/icons.svg#icon-${this.props.type.toLowerCase()}`;
	}
}
