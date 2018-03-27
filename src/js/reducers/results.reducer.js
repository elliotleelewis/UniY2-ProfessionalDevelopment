import data from '../../data/cars.json';

import * as actions from './actions';

const initialState = {
	data,
	results: null,
	sort: 'relevancy',
	selectedResult: null,
};

export default function typeReducer(state = initialState, action) {
	switch (action.type) {
		case actions.SET_RESULTS:
			return { ...state, results: action.payload };
		case actions.CHANGE_RESULT_SORT:
			return { ...state, sort: action.payload };
		case actions.TOGGLE_SELECTED_RESULT:
			return { ...state, selectedResult: (state.selectedResult === action.payload) ? null : action.payload };
		default:
			return state;
	}
}
