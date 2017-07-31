import { combineReducers } from 'redux';

import MouseMove from './MouseMove';

import Resize from './Resize';

import ScrollTop from './ScrollTop';

export default combineReducers({
	MouseMove,
	Resize,
	ScrollTop
});


