import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import RouteMap from './router/routeMap';
import configStore from './store/configStore.js';
let store = configStore({
	MouseMove:{
		type:"MOUSE_MOUVE",
		MouseX:0,
		MouseY:0
	},
	resize:{
		type:'RESIZE_ING'
	},
	ScrollTop:{
		type:"SCROLL_TOP"
	}
});

// 通用样式
import './static/App.less'


render(
	<Provider store={store}>
    	<RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
