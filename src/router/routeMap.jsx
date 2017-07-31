import React from 'react'
import { Router, Route, IndexRoute } from 'react-router';
 
import App from '../container/';
import Home from '../container/Home'

class RouteMap extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render () {
		return (
			<Router history={ this.props.history }>
				<Route path='/' component={ App }>
					<IndexRoute component={Home}/>

				</Route>
			</Router>
		);
	}
}
export default RouteMap;