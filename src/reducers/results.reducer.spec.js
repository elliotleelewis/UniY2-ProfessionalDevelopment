import * as actions from './actions';
import reducer from './results.reducer';

describe('results.reducer', () => {
	it('should return an initial state', () => {
		expect(reducer(undefined, {})).toBeDefined();
	});
	it('should handle SET_RESULTS_SETTINGS', () => {
		const category = 'CATEGORY';
		const value = 'VALUE';
		const state = reducer(undefined, {
			type: actions.SET_RESULTS_SETTINGS,
			payload: {
				category,
				value,
				filters: [],
			},
		});
		expect(state.results).toBeDefined();
		expect(state.results.length).toBeGreaterThan(0);
	});
	it('should handle CHANGE_RESULT_SORT', () => {
		const state = reducer(undefined, {
			type: actions.CHANGE_RESULT_SORT,
			payload: 'TEST_SORT',
		});
		expect(state.sort).toEqual('TEST_SORT');
	});
	it('should handle SET_SELECTED_RESULT', () => {
		let state = reducer(undefined, {
			type: actions.SET_SELECTED_RESULT,
			payload: 1,
		});
		expect(state.selectedResult).toEqual(1);
		state = reducer(state, {
			type: actions.SET_SELECTED_RESULT,
			payload: 1,
		});
		expect(state.selectedResult).toBeNull();
	});
});
