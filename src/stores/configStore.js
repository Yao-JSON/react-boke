import { createStore } from 'redux';
import rootReducer from '../reducer';
export default function configStore(initialState){
	const store = createStore(rootReducer , initialState,
			// 触发 redux-devtools
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
		);
	return store;
};


