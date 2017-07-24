import React from 'react';
import Nav from './nav/index.jsx';
import CanvasBackground from './canvas/canvas-01.jsx';
import Page01 from './pages/pages-01.jsx';
import './home.less';
class Home extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render() {
		return (
			<div>
				<CanvasBackground />
				<Nav/>

				{this.props.children}
			</div>
		);
	}
}
export default Home;