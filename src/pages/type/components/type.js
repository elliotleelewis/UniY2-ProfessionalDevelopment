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
		const { nextType, prevType, relativeSelectedIndex, type } = this.props;
		let action;
		switch (relativeSelectedIndex) {
			case -1:
				action = prevType;
				break;
			case 1:
				action = nextType;
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
					<title>{type}</title>
					<use
						xmlnsXlink="http://www.w3.org/1999/xlink"
						xlinkHref={this.getIconFilepath()}
					/>
				</svg>
				<h5 className="w-100 m-0 text-center">{type}</h5>
			</div>
		);
	}

	/**
	 * Returns the class name for the body type based on the value of the "relativeSelectedIndex"
	 * component prop.
	 * @returns {string}
	 */
	getClassName() {
		const { relativeSelectedIndex } = this.props;
		return [
			'before-pre-selected',
			'pre-selected',
			'selected',
			'post-selected',
			'after-post-selected',
		][relativeSelectedIndex + 2];
	}

	/**
	 * Returns the icon filepath for that specific body type.
	 * @returns {string} - Icon filepath.
	 */
	getIconFilepath() {
		const { type } = this.props;
		return `${
			process.env.PUBLIC_URL
		}/media/icons.svg#icon-${type.toLowerCase()}`;
	}
}
