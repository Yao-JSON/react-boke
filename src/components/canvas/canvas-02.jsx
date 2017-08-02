import React from 'react';
let canvas = null;
let ctx = null;
let t =0,w,h,canvasParentNode;
import './canvas.less';
import {Link} from 'react-router';
let BokeButton = React.createClass({
	propTypes:{
		text:React.PropTypes.string,
		buttonText:React.PropTypes.string
	},
	render(){
		return (
			<div className='boke-button-container'>
				<div>{this.props.text}</div>
				<div>
					<button>
						<Link to='boke'>
							{this.props.buttonText}
						</Link>
					</button>
				</div>
			</div>
		);
	},
	shouldComponentUpdate(nextProps,nextState){
		console.log(nextProps,nextState);
	}
});


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
			minHeight:this.props.clientHeight,
			position:'relative'
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
				<BokeButton text='博客' buttonText='进入博客'/>
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

				ctx.fillStyle = `rgba(${i%255},${255 - i%255},${i%255},0.8)`;
				ctx.fillRect(x,y,1.5,1.5)
			}
			setTimeout(animate,100)
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