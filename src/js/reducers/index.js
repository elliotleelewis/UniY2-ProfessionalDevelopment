import { combineReducers } from 'redux';

import app from './app.reducer';
import type from './type.reducer';
import options from './options.reducer';
import results from './results.reducer';

const rootReducer = combineReducers({
	app,
	type,
	options,
	results,
});

export default rootReducer;
