import 'core-js/fn/object/assign';
import React from 'react';
import { render } from 'react-dom';

import 'styles/App.less';
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import RouteMap from './router/routeMap';
import configStore from './stores/configStore.js';
let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
let store = configStore({
	MouseMove:{
		type:'MOUSE_MOUVE',
		MouseX:0,
		MouseY:0
	},
	Resize:{
		type:'RESIZE_ING',
		clientWidth,
		clientHeight
	},
	ScrollTop:{
		type:'SCROLL_TOP',
		ScrollTop:0
	}
});


// Render the main component into the dom


render(
	<Provider store={store}>
    	<RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('app')
);
