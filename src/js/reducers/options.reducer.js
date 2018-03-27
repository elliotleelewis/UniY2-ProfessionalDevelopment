import * as actions from './actions';

const initialState = {
	category: null,
	value: null,
	values: [],
	filters: [],
};

export default function typeReducer(state = initialState, action) {
	switch (action.type) {
		case actions.SET_OPTIONS_SETTINGS:
			return setOptionsSettings(state, action.payload);
		default:
			return state;
	}
}

function setOptionsSettings(state, settings) {
	const newState = { ...state, category: settings.category, value: settings.value };
	if (!settings.category || !settings.value) {
		return newState;
	}
	if (settings.category === 'body_type') {
		switch (settings.value) {
			case 'Hatchback':
				newState.filters = [
					{
						type: 'doors',
						settings: {
							defaultValue: '5+',
						},
					},
					{
						type: 'price',
						settings: {
							min: 0,
							max: 55000,
							defaultValue: [0, 30000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Low',
						},
					},
				];
				break;
			case 'SUV':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 50000,
							defaultValue: [0, 32000],
						},
					},
					{
						type: 'boot_size',
						settings: {
							defaultValue: 'Large',
						},
					},
					{
						type: 'transmission',
						settings: {
							defaultValue: 'Both',
						},
					},
				];
				break;
			case 'MPV':
				newState.filters = [
					{
						type: 'seats',
						settings: {
							defaultValue: '5+',
						},
					},
					{
						type: 'price',
						settings: {
							min: 0,
							max: 60000,
							defaultValue: [0, 40000],
						},
					},
					{
						type: 'boot_size',
						settings: {
							defaultValue: 'Medium',
						},
					},
					{
						type: 'fuel_consumption',
						settings: {
							defaultValue: 'Medium',
						},
					},
				];
				break;
			case 'Estate':
				newState.filters = [
					{
						type: 'seats',
						settings: {
							defaultValue: '5+',
						},
					},
					{
						type: 'price',
						settings: {
							min: 0,
							max: 50000,
							defaultValue: [0, 35000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Medium',
						},
					},
				];
				break;
			case 'Convertible':
				newState.filters = [
					{
						type: 'seats',
						settings: {
							defaultValue: '2+',
						},
					},
					{
						type: 'price',
						settings: {
							min: 0,
							max: 150000,
							defaultValue: [0, 35000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Considerable',
						},
					},
					{
						type: 'transmission',
						settings: {
							defaultValue: 'Both',
						},
					},
				];
				break;
			case 'Coupe':
				newState.filters = [
					{
						type: 'seats',
						settings: {
							defaultValue: '2+',
						},
					},
					{
						type: 'price',
						settings: {
							min: 0,
							max: 200000,
							defaultValue: [0, 80000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Considerable',
						},
					},
				];
				break;
			case 'Saloon':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 70000,
							defaultValue: [0, 50000],
						},
					},
					{
						type: 'fuel_consumption',
						settings: {
							defaultValue: 'Medium',
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Medium',
						},
					},
				];
				break;
			default:
				break;
		}
	}
	else if (settings.category === 'lifestyle') {
		switch (settings.value) {
			case 'first-car':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 50000,
							defaultValue: [0, 25000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Low',
						},
					},
					{
						type: 'transmission',
						settings: {
							defaultValue: 'Automatic',
						},
					},
				];
				break;
			case 'city-car':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 90000,
							defaultValue: [1000, 30000],
						},
					},
					{
						type: 'fuel_consumption',
						settings: {
							defaultValue: 'Low',
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Low',
						},
					},
				];
				break;
			case 'family-car':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 30000,
							defaultValue: [0, 30000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Low',
						},
					},
					{
						type: 'seats',
						settings: {
							defaultValue: '5+',
						},
					},
				];
				break;
			case 'towing':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 30000,
							defaultValue: [0, 30000],
						},
					},
					{
						type: 'fuel_consumption',
						settings: {
							defaultValue: 'Low',
						},
					},
					{
						type: 'boot_size',
						settings: {
							defaultValue: 'Medium',
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Low',
						},
					},
				];
				break;
			case 'long-distance':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 30000,
							defaultValue: [0, 30000],
						},
					},
					{
						type: 'fuel_consumption',
						settings: {
							defaultValue: 'Low',
						},
					},
					{
						type: 'boot_size',
						settings: {
							defaultValue: 'Medium',
						},
					},
				];
				break;
			case 'performance':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 30000,
							defaultValue: [0, 30000],
						},
					},
					{
						type: 'running_costs',
						settings: {
							defaultValue: 'Low',
						},
					},
					{
						type: 'transmission',
						settings: {
							defaultValue: 'Automatic',
						},
					},
				];
				break;
			case 'off-road':
				newState.filters = [
					{
						type: 'price',
						settings: {
							min: 0,
							max: 30000,
							defaultValue: [0, 30000],
						},
					},
					{
						type: 'boot_size',
						settings: {
							defaultValue: 'Medium',
						},
					},
					{
						type: 'transmission',
						settings: {
							defaultValue: 'Automatic',
						},
					},
				];
				break;
			default:
				break;
		}
	}
	newState.values = newState.filters.map((filter) => ({
		filter: filter.type,
		value: filter.settings.defaultValue,
	}));
	return newState;
}
