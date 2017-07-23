import React from 'react';

class pages extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			<div>
				pages
				{this.props.children}
			</div>
		);
	}
}
export default pages;