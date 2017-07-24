import React from 'react';
import Nav from './nav/index.jsx';
import CanvasBackground from './canvas/canvas-01.jsx';
class Home extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render() {
		return (
			<div>
				<Nav/>
				<CanvasBackground />
				{this.props.children}
			</div>
		);
	}
}
export default Home;