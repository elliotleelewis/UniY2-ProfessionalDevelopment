import * as actions from './actions';
import reducer from './type.reducer';

describe('type.reducer', () => {
	it('should return an initial state', () => {
		expect(reducer(undefined, {})).toBeDefined();
	});
	it('should handle TYPE_INDEX_INC', () => {
		const initialSelectedTypeIndex = 1;
		let state = {
			selectedTypeIndex: initialSelectedTypeIndex,
			types: [
				'A',
				'B',
				'C',
			],
		};
		state = reducer(state, {
			type: actions.TYPE_INDEX_INC,
		});
		expect(state.selectedTypeIndex).toEqual(initialSelectedTypeIndex + 1);
	});
	it('should handle TYPE_INDEX_INC edge case', () => {
		let state = {
			selectedTypeIndex: 2,
			types: [
				'A',
				'B',
				'C',
			],
		};
		state = reducer(state, {
			type: actions.TYPE_INDEX_INC,
		});
		expect(state.selectedTypeIndex).toEqual(0);
	});
	it('should handle TYPE_INDEX_DEC', () => {
		const initialSelectedTypeIndex = 1;
		let state = {
			selectedTypeIndex: initialSelectedTypeIndex,
			types: [
				'A',
				'B',
				'C',
			],
		};
		state = reducer(state, {
			type: actions.TYPE_INDEX_DEC,
		});
		expect(state.selectedTypeIndex).toEqual(initialSelectedTypeIndex - 1);
	});
	it('should handle TYPE_INDEX_DEC edge case', () => {
		let state = {
			selectedTypeIndex: 0,
			types: [
				'A',
				'B',
				'C',
			],
		};
		state = reducer(state, {
			type: actions.TYPE_INDEX_DEC,
		});
		expect(state.selectedTypeIndex).toEqual(state.types.length - 1);
	});
	it('should handle TOGGLE_PRESETS', () => {
		let state = {
			presetsHidden: false,
		};
		state = reducer(state, {
			type: actions.TOGGLE_PRESETS,
		});
		expect(state.presetsHidden).toEqual(true);
		state = reducer(state, {
			type: actions.TOGGLE_PRESETS,
		});
		expect(state.presetsHidden).toEqual(false);
	});
});
