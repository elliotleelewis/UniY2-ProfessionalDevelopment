import filters from '../../data/filters.json';

import * as actions from './actions';

const initialState = {
	category: null,
	filters: [],
	value: null,
};

export default function typeReducer(state = initialState, action) {
	switch (action.type) {
		case actions.SET_OPTIONS_SETTINGS:
			return setOptionsSettings(state, action.payload);
		case actions.SET_FILTER_VALUE:
			return setFilterValue(state, action.payload);
		default:
			return state;
	}
}

function setOptionsSettings(state, settings) {
	const newState = { ...state, category: settings.category, value: settings.value };
	if (!settings.category || !settings.value) {
		return newState;
	}
	const category = filters[settings.category];
	if (category) {
		newState.filters = category[settings.value] || [];
	}
	return newState;
}

function setFilterValue(state, settings) {
	return {
		...state,
		filters: state.filters.map((filter, i) => {
			if (i === settings.index) {
				return { ...filter, value: settings.value };
			}
			return { ...filter };
		}),
	};
}
