import * as actions from './actions';
import reducer from './app.reducer';

describe('app.reducer', () => {
	it('should return an initial state', () => {
		expect(reducer(undefined, {})).toBeDefined();
	});
	it('should handle SET_TITLE', () => {
		const testTitle = 'TestTitle';
		const state = reducer(undefined, {
			type: actions.SET_TITLE,
			payload: testTitle,
		});
		expect(state.title).toEqual(testTitle);
	});
});
