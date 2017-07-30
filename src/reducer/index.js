import { combineReducers } from 'redux';
import MouseMove from './MouseMove.js';
import resize from './resize.js';
import ScrollTop from './ScrollTop.js';


export default combineReducers({
	MouseMove,
	resize,
	ScrollTop
});
