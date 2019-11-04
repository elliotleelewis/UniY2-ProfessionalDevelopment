// --- TYPES ---
// Type
export const TYPE_INDEX_INC = 'TYPE_INDEX_INC';
export const TYPE_INDEX_DEC = 'TYPE_INDEX_DEC';
export const TOGGLE_PRESETS = 'TOGGLE_PRESETS';
// Options
export const SET_OPTIONS_SETTINGS = 'SET_OPTIONS_SETTINGS';
export const SET_FILTER_VALUE = 'SET_FILTER_VALUE';
// Results
export const SET_RESULTS_SETTINGS = 'SET_RESULTS_SETTINGS';
export const CHANGE_RESULT_SORT = 'CHANGE_RESULT_SORT';
export const SET_SELECTED_RESULT = 'SET_SELECTED_RESULT';

// --- GENERATORS ---
// Type
export function typeIndexInc() {
	return {
		type: TYPE_INDEX_INC,
	};
}
export function typeIndexDec() {
	return {
		type: TYPE_INDEX_DEC,
	};
}
export function togglePresets() {
	return {
		type: TOGGLE_PRESETS,
	};
}
// Options
export function setOptionsSettings(category: string, value: string) {
	return {
		type: SET_OPTIONS_SETTINGS,
		payload: {
			category,
			value,
		},
	};
}
export function setFilterValue(index: number, value: any) {
	return {
		type: SET_FILTER_VALUE,
		payload: {
			index,
			value,
		},
	};
}
// Results
export function setResultsSettings(settings: {
	category: string;
	value: string;
	filters: any[];
}) {
	return {
		type: SET_RESULTS_SETTINGS,
		payload: settings,
	};
}
export function changeResultSort(sort: string) {
	return {
		type: CHANGE_RESULT_SORT,
		payload: sort,
	};
}
export function setSelectedResult(index: number) {
	return {
		type: SET_SELECTED_RESULT,
		payload: index,
	};
}
