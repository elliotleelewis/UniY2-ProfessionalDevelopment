import * as actions from './actions';

const initialState = {
	title: null,
};

export default function typeReducer(state = initialState, action) {
	switch (action.type) {
		case actions.SET_TITLE:
			return { ...state, title: action.payload };
		default:
			return state;
	}
}
