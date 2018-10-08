import data from '../data/cars.json';

import * as actions from './actions';

const preparedData = data.models.map((model) => Object.assign(model, {
	make: data.makes[model.make],
}));

const initialState = {
	category: null,
	results: [],
	sort: 'relevancy',
	selectedResult: null,
	value: null,
};

export default function typeReducer(state = initialState, action) {
	switch (action.type) {
		case actions.SET_RESULTS_SETTINGS:
			return setResultsSettings(state, action.payload);
		case actions.CHANGE_RESULT_SORT:
			return { ...state, sort: action.payload };
		case actions.SET_SELECTED_RESULT:
			return {
				...state,
				selectedResult: (state.selectedResult === action.payload) ? null : action.payload,
			};
		default:
			return state;
	}
}

function setResultsSettings(state, options) {
	const newState = {
		...state,
		category: options.category,
		value: options.value,
	};
	newState.results = preparedData.filter((model) => {
		if (options.category === 'body-type' && options.value !== model.body_type) {
			return false;
		}
		return options.filters.every((filter) => {
			switch (filter.type) {
				case 'doors': {
					const value = filter.value.charAt(0);
					if (Number(model.doors) < Number(value)) {
						return false;
					}
					break;
				}
				case 'price': {
					const min = filter.value[0];
					const max = filter.value[1];
					if (model.max_price < min || model.min_price > max) {
						return false;
					}
					break;
				}
				case 'running_costs': {
					const values = ['free', 'low', 'medium', 'considerable'];
					const filterIndex = values.indexOf(filter.value.toLowerCase());
					const modelAnnualTax = values.indexOf(model.annual_tax.toLowerCase());
					const modelInsurance = values.indexOf(model.insurance.toLowerCase());
					if (modelAnnualTax > filterIndex || modelInsurance > filterIndex) {
						return false;
					}
					break;
				}
				case 'boot_size': {
					const values = ['small', 'medium', 'large'];
					const filterIndex = values.indexOf(filter.value.toLowerCase());
					const modelBootSize = values.indexOf(model.boot_size.toLowerCase());
					if (modelBootSize > filterIndex) {
						return false;
					}
					break;
				}
				case 'transmission': {
					if (filter.value.toLowerCase() !== 'both' && filter.value.toLowerCase() !== model.transmission.toLowerCase()) {
						return false;
					}
					break;
				}
				case 'seats': {
					const filterSeats = filter.value.charAt(0);
					if (Number(model.seats) < Number(filterSeats)) {
						return false;
					}
					break;
				}
				case 'fuel_consumption': {
					const values = ['low', 'medium', 'considerable'];
					const filterValues = ['minimal', 'medium', 'considerable'];
					const filterIndex = values.indexOf(filter.value.toLowerCase());
					const modelFuelConsumption = filterValues.indexOf(model.fuel_consumption.toLowerCase());
					if (modelFuelConsumption > filterIndex) {
						return false;
					}
					break;
				}
				case 'acceleration': {
					const values = ['steady', 'medium', 'fast'];
					const filterIndex = values.indexOf(filter.value.toLowerCase());
					const modelAcceleration = values.indexOf(model.acceleration.toLowerCase());
					if (modelAcceleration > filterIndex) {
						return false;
					}
					break;
				}
				default:
					break;
			}
			return true;
		});
	});
	return newState;
}