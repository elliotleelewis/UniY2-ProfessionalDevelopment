import * as actions from './actions';

export interface TypeState {
	types: string[];
	presets: string[];
	selectedTypeIndex: number;
	presetsHidden: boolean;
}

const initialState: TypeState = {
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
	presetsHidden: window.screen.height < 600,
};

export default function typeReducer(
	state: TypeState = initialState,
	action: { type: string; payload: any },
) {
	switch (action.type) {
		case actions.TYPE_INDEX_INC: {
			let index = state.selectedTypeIndex;
			return {
				...state,
				selectedTypeIndex: index < state.types.length - 1 ? ++index : 0,
			};
		}
		case actions.TYPE_INDEX_DEC: {
			let index = state.selectedTypeIndex;
			return {
				...state,
				selectedTypeIndex: index > 0 ? --index : state.types.length - 1,
			};
		}
		case actions.TOGGLE_PRESETS: {
			return { ...state, presetsHidden: !state.presetsHidden };
		}
		default:
			return { ...state };
	}
}
