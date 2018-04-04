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
		let action;
		switch (this.props.relativeSelectedIndex) {
			case -1:
				action = this.props.prevType;
				break;
			case 1:
				action = this.props.nextType;
				break;
			default:
				action = () => {};
				break;
		}
		const keyboardAction = (kbEvent) => {
			if (kbEvent.keyCode && kbEvent.keyCode === 13) {
				action();
			}
		};
		return (
			<div
				className={`type ${this.getClassName()}`}
				role="button"
				onClick={action}
				onKeyDown={keyboardAction}
				tabIndex={0}
			>
				<svg className="w-100">
					<title>{this.props.type}</title>
					<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={this.getIconFilepath()} />
				</svg>
				<h5 className="w-100 m-0 text-center">{this.props.type}</h5>
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
