import React from 'react';
import { connect } from 'react-redux';

class About extends React.Component{
	render() {
		return (
			<div>About</div>
		);
	}
}

export default connect()(About);
