import React from 'react';
let canvas = null;
let ctx = null;
let t =0,w,h,canvasParentNode;


class Canvas02 extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render(){
		if(canvasParentNode && canvas){
			let canvasParentNodeStyle = window.getComputedStyle(canvasParentNode);
			w = parseInt(canvasParentNodeStyle.width);
			h = parseInt(canvasParentNodeStyle.height);
			canvas.width = w;
			canvas.height=h;
		}
		let style = {
			minHeight:this.props.clientHeight
		}
		return (
			<div className='canvas-circle'
			style={style}
			ref={node => {
				canvasParentNode = node;
			}}>
				<canvas
				className='canvas-02'
				ref = {node => {
					canvas = node;
				}}
				></canvas>
			</div>
		);
	}
	componentDidMount(){
		ctx = canvas.getContext('2d');
		let canvasParentNodeStyle = window.getComputedStyle(canvasParentNode);
		w = parseInt(canvasParentNodeStyle.width);
		h = parseInt(canvasParentNodeStyle.height);
		let clientWidth = this.props.clientWidth;
		let dotNum = 10000 * clientWidth /1920;
		canvas.width = w;
		canvas.height=h;
		function animate(){
			ctx.clearRect(0,0,w,h);
			t += 0.1;
			for(let i =0;++i<dotNum;){
				var f = 0.05 + ((Math.sin(t * 0.00002) / Math.PI) * 0.2);

		        var r = (Math.min(w, h)) * (Math.cos((t + i) * f) / Math.PI * 1.5);
		        var x = Math.sin(i) * r + (canvas.width / 2);
		        var y = Math.cos(i) * r + (canvas.height / 2);

				ctx.fillStyle = `rgba(225,0,255,0.5)`;
				ctx.fillRect(x,y,1.5,1.5)
			}
			setTimeout(animate,20)
		}
		animate();
	}
	shouldComponentUpdate(nextProps){
		return (
			this.props.clientHeight !== nextProps.clientHeight 
			||
			this.props.clientWidth !== nextProps.clientWidth
			||
			this.props.clientWidth !== nextProps.clientWidth);
	}
	componentDidUpdate(){
		w = canvas.width;
		h = canvas.height;
	}
}
export default Canvas02;