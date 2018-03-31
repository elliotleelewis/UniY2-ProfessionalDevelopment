// --- TYPES ---
// App
export const SET_TITLE = 'SET_TITLE';
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
export const TOGGLE_SELECTED_RESULT = 'TOGGLE_SELECTED_RESULT';

// --- GENERATORS ---
// App
export function setTitle(title) {
	return {
		type: SET_TITLE,
		payload: title,
	};
}
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
export function setOptionsSettings(category, value) {
	return {
		type: SET_OPTIONS_SETTINGS,
		payload: {
			category,
			value,
		},
	};
}
export function setFilterValue(index, value) {
	return {
		type: SET_FILTER_VALUE,
		payload: {
			index,
			value,
		},
	};
}
// Results
export function setResultsSettings(settings) {
	return {
		type: SET_RESULTS_SETTINGS,
		payload: settings,
	};
}
export function changeResultSort(sort) {
	return {
		type: CHANGE_RESULT_SORT,
		payload: sort,
	};
}
export function toggleSelectedResult(index) {
	return {
		type: TOGGLE_SELECTED_RESULT,
		payload: index,
	};
}
