import React from 'react';
import {connect} from 'react-redux';

class Home extends React.Component{
	render(){
		return (
			<div>HOME</div>
		);
	}
}

export default connect()(Home);