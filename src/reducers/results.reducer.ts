import data from '../data/cars.json';
import { Make } from '../models/make';

import * as actions from './actions';

Object.keys(data.makes).map((make) =>
	Object.assign((data.makes as { [key: string]: Make })[make], {
		data_name: (data.makes as { [key: string]: Make })[make].name
			.replace(/\s+/g, '-')
			.toLowerCase(),
	}),
);
const preparedData = data.models.map((model) =>
	Object.assign(model, {
		make: (data.makes as { [key: string]: Make })[model.make],
		data_name: model.model.replace(/\s+/g, '-').toLowerCase(),
	}),
);

export interface ResultsState {
	category: string;
	results: object[];
	sort: string;
	selectedResult: number;
	value: string;
}

const initialState: ResultsState = {
	category: '',
	results: [],
	sort: 'relevancy',
	// @ts-ignore
	selectedResult: null,
	value: '',
};

export default function typeReducer(
	state: ResultsState = initialState,
	action: { type: string; payload: any },
) {
	switch (action.type) {
		case actions.SET_RESULTS_SETTINGS:
			return setResultsSettings(
				state,
				action.payload as {
					category: string;
					value: string;
					filters: any[];
				},
			);
		case actions.CHANGE_RESULT_SORT:
			return { ...state, sort: action.payload as string };
		case actions.SET_SELECTED_RESULT:
			return {
				...state,
				selectedResult:
					state.selectedResult === action.payload
						? null
						: action.payload,
			};
		default:
			return state;
	}
}

function setResultsSettings(
	state: ResultsState,
	options: { category: string; value: string; filters: any[] },
) {
	const newState = {
		...state,
		category: options.category,
		value: options.value,
	};
	newState.results = preparedData.filter((model) => {
		if (
			options.category === 'body-type' &&
			options.value !== model.body_type
		) {
			return false;
		}
		return options.filters.every((filter: any) => {
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
					const filterIndex = values.indexOf(
						filter.value.toLowerCase(),
					);
					const modelAnnualTax = values.indexOf(
						model.annual_tax.toLowerCase(),
					);
					const modelInsurance = values.indexOf(
						model.insurance.toLowerCase(),
					);
					if (
						modelAnnualTax > filterIndex ||
						modelInsurance > filterIndex
					) {
						return false;
					}
					break;
				}
				case 'boot_size': {
					const values = ['small', 'medium', 'large'];
					const filterIndex = values.indexOf(
						filter.value.toLowerCase(),
					);
					const modelBootSize = values.indexOf(
						model.boot_size.toLowerCase(),
					);
					if (modelBootSize > filterIndex) {
						return false;
					}
					break;
				}
				case 'transmission': {
					if (
						filter.value.toLowerCase() !== 'both' &&
						filter.value.toLowerCase() !==
							model.transmission.toLowerCase()
					) {
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
					const filterIndex = values.indexOf(
						filter.value.toLowerCase(),
					);
					const modelFuelConsumption = filterValues.indexOf(
						model.fuel_consumption.toLowerCase(),
					);
					if (modelFuelConsumption > filterIndex) {
						return false;
					}
					break;
				}
				case 'acceleration': {
					const values = ['steady', 'medium', 'fast'];
					const filterIndex = values.indexOf(
						filter.value.toLowerCase(),
					);
					const modelAcceleration = values.indexOf(
						model.acceleration.toLowerCase(),
					);
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
