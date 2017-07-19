require('normalize.css/normalize.css');
require('styles/App.less');
import React from 'react';

class AppComponent extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
		  	<div className="index">
		   		<h1 style={{textAlign:'center',marginTop:'150px',color:'#fff'}}>{this.props.hello}</h1>
		   		<h1 style={{textAlign:'center',marginTop:'20px',color:'#fff'}}>{this.props.title}</h1>
		  	</div>
		);
	}
}

AppComponent.defaultProps = {
	hello:'hello world',
	title:'你好，世界！'
};

export default AppComponent;
