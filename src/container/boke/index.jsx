import React from 'react';
import { connect } from 'react-redux';

class Boke extends React.Component{
	render (){
		return (
			<div>Boke</div>
		);
	}
}


export default connect()(Boke);