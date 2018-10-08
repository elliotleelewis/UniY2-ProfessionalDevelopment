import * as actions from './actions';

describe('actions', () => {
	describe('type', () => {
		it('should return the correct action object when using the action generator for the "TYPE_INDEX_INC" action', () => {
			const expectedAction = {
				type: actions.TYPE_INDEX_INC,
			};
			expect(actions.typeIndexInc()).toEqual(expectedAction);
		});
		it('should return the correct action object when using the action generator for the "TYPE_INDEX_DEC" action', () => {
			const expectedAction = {
				type: actions.TYPE_INDEX_DEC,
			};
			expect(actions.typeIndexDec()).toEqual(expectedAction);
		});
		it('should return the correct action object when using the action generator for the "TOGGLE_PRESETS" action', () => {
			const expectedAction = {
				type: actions.TOGGLE_PRESETS,
			};
			expect(actions.togglePresets()).toEqual(expectedAction);
		});
	});
	describe('options', () => {
		it('should return the correct action object when using the action generator for the "SET_OPTIONS_SETTINGS" action', () => {
			const category = 'CATEGORY';
			const value = 'VALUE';
			const expectedAction = {
				type: actions.SET_OPTIONS_SETTINGS,
				payload: {
					category,
					value,
				},
			};
			expect(actions.setOptionsSettings(category, value)).toEqual(expectedAction);
		});
		it('should return the correct action object when using the action generator for the "SET_FILTER_VALUE" action', () => {
			const index = 1;
			const value = 'value';
			const expectedAction = {
				type: actions.SET_FILTER_VALUE,
				payload: {
					index,
					value,
				},
			};
			expect(actions.setFilterValue(index, value)).toEqual(expectedAction);
		});
	});
	describe('results', () => {
		it('should return the correct action object when using the action generator for the "SET_RESULTS_SETTINGS" action', () => {
			const settings = 'SETTINGS';
			const expectedAction = {
				type: actions.SET_RESULTS_SETTINGS,
				payload: settings,
			};
			expect(actions.setResultsSettings(settings)).toEqual(expectedAction);
		});
		it('should return the correct action object when using the action generator for the "CHANGE_RESULT_SORT" action', () => {
			const sort = 'SORT';
			const expectedAction = {
				type: actions.CHANGE_RESULT_SORT,
				payload: sort,
			};
			expect(actions.changeResultSort(sort)).toEqual(expectedAction);
		});
		it('should return the correct action object when using the action generator for the "TOGGLE_SELECTED_RESULT" action', () => {
			const index = 1;
			const expectedAction = {
				type: actions.SET_SELECTED_RESULT,
				payload: index,
			};
			expect(actions.setSelectedResult(index)).toEqual(expectedAction);
		});
	});
});
