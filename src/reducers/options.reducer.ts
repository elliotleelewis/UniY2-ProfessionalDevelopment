import filters from '../data/filters.json';

import * as actions from './actions';

export interface OptionsState {
	category?: string;
	filters: any[];
	value?: string;
}

const initialState: OptionsState = {
	category: undefined,
	filters: [],
	value: undefined,
};

export default function typeReducer(
	state: OptionsState = initialState,
	action: { type: string; payload: any },
) {
	switch (action.type) {
		case actions.SET_OPTIONS_SETTINGS:
			return setOptionsSettings(state, action.payload as {
				category: string;
				value: string;
			});
		case actions.SET_FILTER_VALUE:
			return setFilterValue(state, action.payload as {
				index: number;
				value: string;
			});
		default:
			return state;
	}
}

function setOptionsSettings(
	state: OptionsState,
	settings: { category: string; value: string },
) {
	const newState = {
		...state,
		category: settings.category,
		value: settings.value,
	};
	if (!settings.category || !settings.value) {
		return newState;
	}
	const category = (filters as { [key: string]: object })[settings.category];
	if (category) {
		newState.filters =
			(category as { [key: string]: any[] })[settings.value] || [];
	}
	return newState;
}

function setFilterValue(
	state: OptionsState,
	settings: { index: number; value: string },
) {
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
