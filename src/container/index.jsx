import React from 'react';
import { connect } from 'react-redux';
import { MouseMove , resize } from '../action'
class App extends React.Component{
	constructor(props,context) {
	  super(props , context);

	  this.state = {
	  	initDone: false // 是否初始化完成
	  };

	}
	render (){
		return (
			<div style={{height:'700px'}} 
			onMouseMove={e => {
				e.preventDafault;
				let MouseX =e.pageX;
				let MouseY =e.pageY;
				this.props.MouseMove({MouseX,MouseY})
			}}
			onWheel = {e=>{
				e.preventDafault;
				console.log(e.deltaY);
			}}>
				{
					this.state.initDone?
					this.props.children:
					<div>正在加载中...</div>
				}
			</div>
		);
	}
	componentDidMount() {
		let me = this;
		window.addEventListener('resize',(e) => {
			e.preventDefault();
			e.stopPropagation();
			let clientWidth = 0;
			let clientHeigth = 0;
			if(document.documentElement && document.documentElement.clientWidth){
				clientWidth = document.documentElement.clientWidth;
				clientHeigth = document.documentElement.clientHeigth;
			}else if(document.body && document.body.clientWidth){
				clientWidth = document.body.clientWidth;
				clientHeigth = document.body.clientHeigth;
			}
			this.props.resize({clientWidth,clientHeigth});
		})

		this.setState({
			initDone:true
		})
	}

}
let mapDispatchProps = (dispatch , ownProps) => {
	return {
		MouseMove: ({MouseX,MouseY}) => {
			dispatch(MouseMove({MouseX,MouseY}))
		},
		resize:({clientWidth,clientHeigth}) => {
			dispatch(resize({clientWidth,clientHeigth}))
		}
	}
}
let mapStateToProps = (state,ownProps) => {
	return {
		type:'MOUSE_MOVE'
	}
}

export default connect(mapStateToProps,mapDispatchProps)(App);



