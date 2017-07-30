import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from '../container'
import Home from '../container/home'
import Boke from '../container/boke'
import NotFound from '../container/404.jsx'
import About from '../container/about'
class RouteMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }
    render() {
        return (
             <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='boke' component={Boke}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        )
    }
}

export default RouteMap