import * as actions from './actions';

const initialState = {
	category: null,
	value: null,
	filters: [],
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
	if (settings.category === 'body_type') {
		switch (settings.value) {
			case 'Hatchback':
				newState.filters = [
					{
						type: 'doors',
						value: '5+',
					},
					{
						type: 'price',
						value: [0, 30000],
						settings: {
							min: 0,
							max: 55000,
						},
					},
					{
						type: 'running_costs',
						value: 'Low',
					},
				];
				break;
			case 'SUV':
				newState.filters = [
					{
						type: 'price',
						value: [0, 32000],
						settings: {
							min: 0,
							max: 50000,
						},
					},
					{
						type: 'boot_size',
						value: 'Large',
					},
					{
						type: 'transmission',
						value: 'Both',
					},
				];
				break;
			case 'MPV':
				newState.filters = [
					{
						type: 'seats',
						value: '5+',
					},
					{
						type: 'price',
						value: [0, 40000],
						settings: {
							min: 0,
							max: 60000,
						},
					},
					{
						type: 'boot_size',
						value: 'Medium',
					},
					{
						type: 'fuel_consumption',
						value: 'Medium',
					},
				];
				break;
			case 'Estate':
				newState.filters = [
					{
						type: 'seats',
						value: '5+',
					},
					{
						type: 'price',
						value: [0, 35000],
						settings: {
							min: 0,
							max: 50000,
						},
					},
					{
						type: 'running_costs',
						value: 'Medium',
					},
				];
				break;
			case 'Convertible':
				newState.filters = [
					{
						type: 'seats',
						value: '2+',
					},
					{
						type: 'price',
						value: [0, 35000],
						settings: {
							min: 0,
							max: 150000,
						},
					},
					{
						type: 'running_costs',
						value: 'Considerable',
					},
					{
						type: 'transmission',
						value: 'Both',
					},
				];
				break;
			case 'Coupe':
				newState.filters = [
					{
						type: 'seats',
						value: '2+',
					},
					{
						type: 'price',
						value: [0, 80000],
						settings: {
							min: 0,
							max: 200000,
						},
					},
					{
						type: 'running_costs',
						value: 'Considerable',
					},
				];
				break;
			case 'Saloon':
				newState.filters = [
					{
						type: 'price',
						value: [0, 50000],
						settings: {
							min: 0,
							max: 70000,
						},
					},
					{
						type: 'fuel_consumption',
						value: 'Medium',
					},
					{
						type: 'running_costs',
						value: 'Medium',
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
						value: [0, 25000],
						settings: {
							min: 0,
							max: 50000,
						},
					},
					{
						type: 'running_costs',
						value: 'Low',
					},
					{
						type: 'transmission',
						value: 'Automatic',
					},
				];
				break;
			case 'city-car':
				newState.filters = [
					{
						type: 'price',
						value: [1000, 30000],
						settings: {
							min: 0,
							max: 90000,
						},
					},
					{
						type: 'fuel_consumption',
						value: 'Low',
					},
					{
						type: 'running_costs',
						value: 'Low',
					},
				];
				break;
			case 'family-car':
				newState.filters = [
					{
						type: 'price',
						value: [0, 30000],
						settings: {
							min: 0,
							max: 30000,
						},
					},
					{
						type: 'running_costs',
						value: 'Low',
					},
					{
						type: 'seats',
						value: '5+',
					},
				];
				break;
			case 'towing':
				newState.filters = [
					{
						type: 'price',
						value: [0, 30000],
						settings: {
							min: 0,
							max: 30000,
						},
					},
					{
						type: 'fuel_consumption',
						value: 'Low',
					},
					{
						type: 'boot_size',
						value: 'Medium',
					},
					{
						type: 'running_costs',
						value: 'Low',
					},
				];
				break;
			case 'long-distance':
				newState.filters = [
					{
						type: 'price',
						value: [0, 30000],
						settings: {
							min: 0,
							max: 30000,
						},
					},
					{
						type: 'fuel_consumption',
						value: 'Low',
					},
					{
						type: 'boot_size',
						value: 'Medium',
					},
				];
				break;
			case 'performance':
				newState.filters = [
					{
						type: 'price',
						value: [0, 30000],
						settings: {
							min: 0,
							max: 30000,
						},
					},
					{
						type: 'running_costs',
						value: 'Low',
					},
					{
						type: 'transmission',
						value: 'Automatic',
					},
				];
				break;
			case 'off-road':
				newState.filters = [
					{
						type: 'price',
						value: [0, 30000],
						settings: {
							min: 0,
							max: 30000,
						},
					},
					{
						type: 'boot_size',
						value: 'Medium',
					},
					{
						type: 'transmission',
						value: 'Automatic',
					},
				];
				break;
			default:
				break;
		}
	}
	newState.values = newState.filters.map((filter) => ({
		filter: filter.type,
		value: filter.value,
	}));
	return newState;
}

function setFilterValue(state, settings) {
	const filters = state.filters.map((filter, i) => {
		if (i === settings.index) {
			return { ...filter, value: settings.value };
		}
		return { ...filter };
	});
	return { ...state, filters };
}
