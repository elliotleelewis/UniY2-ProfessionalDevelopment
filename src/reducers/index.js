import { combineReducers } from 'redux';

import type from './type.reducer';
import options from './options.reducer';
import results from './results.reducer';

const rootReducer = combineReducers({
	type,
	options,
	results,
});

export default rootReducer;
