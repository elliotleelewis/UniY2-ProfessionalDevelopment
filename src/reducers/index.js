import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import type from './type.reducer';
import options from './options.reducer';
import results from './results.reducer';

export default (history) => combineReducers({
	router: connectRouter(history),
	type,
	options,
	results,
});
