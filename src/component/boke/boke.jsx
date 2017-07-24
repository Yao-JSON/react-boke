import React from 'react';

class Boke extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			<div>
				<span style={{color:'#fff'}}>pages</span>
				{this.props.children}
			</div>
		);
	}
}
export default Boke;