import * as actions from './actions';

const initialState = {
	types: [
		'Saloon',
		'Hatchback',
		'SUV',
		'MPV',
		'Estate',
		'Convertible',
		'Coupe',
	],
	presets: [
		'First Car',
		'City Car',
		'Family Car',
		'Towing',
		'Long Distance',
		'Performance',
		'Off Road',
	],
	selectedTypeIndex: 1,
	presetsHidden: $(window).height() < 600,
};

export default function typeReducer(state = initialState, action) {
	switch (action.type) {
		case actions.TYPE_INDEX_INC: {
			let index = state.selectedTypeIndex;
			index += 1;
			return { ...state, selectedTypeIndex: (state.types.length > index) ? index : 0 };
		}
		case actions.TYPE_INDEX_DEC: {
			let index = state.selectedTypeIndex;
			index -= 1;
			return { ...state, selectedTypeIndex: (state.types.length > 0) ? index : state.types.length - 1 };
		}
		case actions.TOGGLE_PRESETS: {
			return { ...state, presetsHidden: !state.presetsHidden };
		}
		default:
			return { ...state };
	}
}
