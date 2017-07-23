import React from 'react';
import Nav from './nav/index.jsx'
class Home extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			<div>
				<Nav/>
				{this.props.children}
			</div>
		);
	}
}
export default Home;