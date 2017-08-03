import React from 'react'
import { Router, Route, IndexRoute } from 'react-router';

import App from '../container/';
import Home from '../container/Home';
import Boke from '../container/boke';
import About from '../container/About';
import Me from '../container/me';

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
          <Route path='about' component={About}/>
          <Route path='boke' component={Boke}/>
          <Route path='/me(/:name)'>
            <IndexRoute component={Me}/>
          </Route>
				</Route>
			</Router>
		);
	}
}
export default RouteMap;
