import React from 'react';

import { connect } from 'react-redux';
import { Resize , MouseMove , ScrollTop } from '../actions';

let oldTop = 0;

class App extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	initDone:false
	  };
	}
	MouseMove(e){
		let Top = document.documentElement.scrollTop || document.body.scrollTop;
		let MouseX = e.pageX;
		let MouseY = e.pageY - Top;
		this.props.MouseMove({MouseX,MouseY});
	}
	render(){
		return (
			<div
			onMouseMove={e => {
				e.preventDefault();
				this.MouseMove(e)
			}}
			onWheel={() => {
				let Top = document.documentElement.scrollTop || document.body.scrollTop;
				if(Top == oldTop){
					return;
				}
				oldTop = Top;
				this.props.ScrollTop(Top)
			}}>
				{
					this.state.initDone?
					this.props.children:
					<span style={{color:'#fff'}}>正在加载中...</span>
				}
			</div>
		);
	}
	componentDidMount(){
		window.addEventListener('resize',(e) => {
			e.preventDefault();
			let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			this.props.Resize({clientWidth,clientHeight})
		},false);
		this.setState({
			initDone:true
		});

	}
}

let mapDispatchProps = (dispatch) => {
	return {
		MouseMove: ({MouseX,MouseY}) => {
			dispatch(MouseMove({MouseX,MouseY}))
		},
		Resize:({clientWidth,clientHeight}) => {
			dispatch(Resize({clientWidth,clientHeight}))
		},
		ScrollTop:(Top) => {
			dispatch(ScrollTop(Top))
		}
	};
}
let mapStateToProps = (state) => {
  console.log(state);
	return state;
}


export default connect(mapStateToProps,mapDispatchProps)(App);


