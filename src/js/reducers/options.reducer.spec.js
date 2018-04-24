import * as actions from './actions';
import reducer from './options.reducer';

describe('options.reducer', () => {
	it('should return an initial state', () => {
		expect(reducer(undefined, {})).toBeDefined();
	});
	it('should handle SET_OPTIONS_SETTINGS', () => {
		const state = reducer(undefined, {
			type: actions.SET_OPTIONS_SETTINGS,
			payload: {
				category: 'preset',
				value: 'first-car',
			},
		});
		expect(state.category).toEqual('preset');
		expect(state.value).toEqual('first-car');
		expect(state.filters).toBeDefined();
		expect(state.filters.length).toBeGreaterThan(0);
	});
	it('should handle SET_FILTER_VALUE', () => {
		const state = reducer(
			{
				filters: [
					{
						value: null,
					},
				],
			},
			{
				type: actions.SET_FILTER_VALUE,
				payload: {
					index: 0,
					value: 'TEST',
				},
			},
		);
		expect(state.filters).toBeDefined();
		expect(state.filters[0]).toBeDefined();
		expect(state.filters[0].value).toEqual('TEST');
	});
});
