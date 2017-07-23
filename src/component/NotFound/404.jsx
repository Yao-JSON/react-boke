import React from 'react';

class NotFound extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render() {
		return (
			<div>
				404
				{this.props.children}
			</div>
		);
	}
}
export default NotFound;