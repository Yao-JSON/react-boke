import React from 'react';
import './canvas.less';
let ctx = null;

// 创建 实例 Color
class Color {
	constructor(min){
		min = min || 0;
		this.r = this.colorValue(min);
		this.g = this.colorValue(min);
		this.b = this.colorValue(min);
		this.style = this.createColorStyle(this.r,this.g,this.b)
	}
	createColorStyle(r , g , b){
		return `rgba(${ r } ,${ g } ,${ b },0.9)`;
	}
	colorValue(min){
		return Math.floor(Math.random() * (255 - min) + min);
	}

}

class Dot{
	constructor(canvas){
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		this.vx = -0.5 + Math.random(); // 每帧动画 x 轴 移动距离
		this.vy = -0.5 + Math.random(); // 每帧动画 y 轴 移动距离

		this.radius = Math.random() * 2;
		this.color = new Color();
	}
	draw(){
		ctx.beginPath();
		ctx.fillStyle = this.color.style;
		// 创建圆弧 圆心 x 圆心 y 圆弧 半径  圆弧起始角度  圆弧终点 是否逆时针绘图
		ctx.arc(this.x , this.y , this.radius, 0 , Math.PI * 2, false);
		ctx.fill();	
	}
}

// 创建
class Dots{
	constructor (props) {
		this.num = 400;
		this.distance = props.canvas.width/14; // 两个点的距离
		this.d_radius = props.canvas.width/12; // 距离鼠标中心点的距离 140 的点
		this.array = [];
		this.canvas ={
			width:props.canvas.width,
			height:props.canvas.height
		}
		this.mouseCenter = {
			x:props.mouseCenter.x,
			y:props.mouseCenter.y
		}
		this.createDots();
		requestAnimationFrame(this.animateDots.bind(this));

	}
	// 创建 Dots 组合
	createDots(){
		for(let i =0;i<this.num;i++){
			this.array.push(new Dot(this.canvas));
		}
	}
	// 移动所有的Dots
	moveDots (){
		for(let i = 0;i<this.num;i++){
			let dot = this.array[i];
			if(dot.y < 0 || dot.y > this.canvas.height ){
				dot.vy = -dot.vy
			}
			if(dot.x < 0 || dot.x > this.canvas.width){
				dot.vx = -dot.vx;
			}
			dot.x += dot.vx;
			dot.y += dot.vy;
		}
	}
	minStyleNum(i_color_RGB,i_radius,j_color_RGB,j_radius){
		return (i_color_RGB * i_radius + j_color_RGB * j_radius)/(i_radius + j_radius);
	}
	// 两点之间平均的样式
	averageColorStyles (i_dot,j_dot) {
		let i_color = i_dot.color;
		let j_color = j_dot.color;
		let i_radius = i_dot.radius;
		let j_radius = j_dot.radius;
		let r = this.minStyleNum(i_color.r,i_radius,j_color.r,j_radius),
			g = this.minStyleNum(i_color.g,i_radius,j_color.g,j_radius),
			b = this.minStyleNum(i_color.b,i_radius,j_color.b,j_radius);
		return `rgba(${ r } ,${ g } ,${ b },0.2)`;	
	}
	//  链接 鼠标附近的 线条
	connectDots(){
		for(let i =0;i<this.num;i++){
			for(let j =0;j<this.num;j++){
				let i_dot = this.array[i];
				let j_dot = this.array[j];
				// 相邻的两个点 距离小于 100
				if(Math.abs(i_dot.x - j_dot.x) < this.distance && Math.abs(i_dot.y - j_dot.y) < this.distance ){
					if(Math.abs(i_dot.x - this.mouseCenter.x ) < this.d_radius && Math.abs(i_dot.y - this.mouseCenter.y) < this.d_radius){
						ctx.beginPath();
						ctx.strokeStyle = this.averageColorStyles(i_dot,j_dot);
						ctx.moveTo(i_dot.x,i_dot.y);
						ctx.lineTo(j_dot.x,j_dot.y);
						ctx.stroke();
						ctx.closePath();
					}
				}
			}
		}
	}
	// 画所有的 dot 点
	drawDots () {
		for(let i = 0;i<this.num;i++){
			this.array[i].draw();
		}
	}
	// 添加动画
	animateDots(){
		// 1、 清空画布
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		// 2、 移动所有点
		this.moveDots();
		// 3、 链接所有点
		this.connectDots();
		// 4、 画线 和点
		this.drawDots();
		requestAnimationFrame(this.animateDots.bind(this));
	}	
}
 



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
		let style =window.getComputedStyle(this.refs['canvasParentNode']);
		let width = parseInt(style.width);
		let height = parseInt(style.height);
		this.setState({
			canvasWidth:width,
			canvasHeight:height,
			mouseCenter:{
				x:50 * width / 100,
				y:50 * height / 100
			}
		});
		this.createContext({
			canvas:{
				width,
				height
			},
			mouseCenter:{
				x:50 * width / 100,
				y:50 * height / 100
			}
		});
	}
	createContext(DotProps){ // 创建画板
		ctx = this.refs['canvasNode'].getContext('2d');
		this.setState({
			DOT:new Dots(DotProps)	
		});
		
	}
	canvasMouseMove(e){
		e.preventDefault();
		e.stopPropagation();
		let DOT = this.state.DOT;
		let x = e.pageX;
		let y = e.pageY;
		DOT.mouseCenter = {
			x,
			y
		}
	}
	canvasMouseOut(){
		let DOT = this.state.DOT;
		DOT.mouseCenter = {
			x:this.state.mouseCenter.x,
			y:this.state.mouseCenter.y
		}
	}
	render(){
		return (
			<div className="canvas-background-container" ref='canvasParentNode' > 
				<canvas width={this.state.canvasWidth} onMouseMove ={this.canvasMouseMove.bind(this)} onMouseOut ={this.canvasMouseOut.bind(this)} height={this.state.canvasHeight} ref='canvasNode'></canvas>
			</div>
		);
	}
}
export default CanvasBackground;