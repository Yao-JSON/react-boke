import React from 'react';
import './canvas.less';
class CanvasBackground extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			canvasWidth:0,
			canvasHeight:0,
			canvasParentNode:null,
			canvasNode:null
		};
	}
	componentDidMount(){
		this.setState({
			canvasParentNode:this.refs['canvasParentNode'],
			canvasNode:this.refs['canvasNode']
		});
		this.calcCanvasWidthOrHeight();
		window.addEventListener('resize',() => {
			this.calcCanvasWidthOrHeight();
		});
	}
	calcCanvasWidthOrHeight(){
		let canvasParentNode = this.state.canvasParentNode;
		
		let style =window.getComputedStyle(this.refs['canvasParentNode']);
		let width = parseInt(style.width);
		let height = parseInt(style.height);

		this.setState({
			canvasWidth:width,
			canvasHeight:height
		});
		this.setProps({
			width,
			height
		});
		console.log(this.props);
	}

	render(){
		return (
			<div className="canvas-background-container" ref='canvasParentNode' > 
				<canvas width={this.state.canvasWidth} height={this.state.canvasHeight} ref='canvasNode'></canvas>
			</div>
		);
	}
}
export default CanvasBackground;