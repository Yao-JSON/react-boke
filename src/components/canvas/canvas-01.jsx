import  React from 'react';
let canvas = null;
let ctx = null;
// 创建 实力 color
class Color {
	constructor(min) {
	   	min = min || 0;
	   	this.r = this.colorValue(min);
	   	this.g = this.colorValue(min);
	   	this.b = this.colorValue(min);
	   	this.a = Math.random();
	   	this.style = this.createColorStyle(this.r,this.g,this.b,this.a);
	}
	createColorStyle(r,g,b,a){
		return `rgba(${r},${g},${b},${a})`;
	}
	colorValue(min){
		return Math.floor(Math.random() * (255 - min) + min);
	}
}

// 创建 单个 星点实例

class Dot {
	constructor({clientWidth,clientHeight}) {
	 	//  当前点的坐标
	 	this.x = Math.random() * clientWidth;
	 	this.y = Math.random() * clientHeight;

	 	// 当前点 每帧 移动的距离
	 	this.vx = -0.5 + Math.random();
	 	this.vy = -0.5 + Math.random();

	 	// 当前点的半径
	 	this.radius = Math.random() * 2;
	 	// 填充颜色
	 	this.color = new Color();
	}
	draw () {
		ctx.beginPath();
		ctx.fillStyle = this.color.style;

		// 创建圆弧 圆心 x 圆心 y 圆弧 半径  圆弧起始角度  圆弧终点 是否逆时针绘图
		ctx.arc(this.x , this.y , this.radius, 0 , Math.PI * 2, false);

		ctx.fill();
	}
}


class Dots {
	constructor({clientWidth,clientHeight,MouseX,MouseY}) {
	  	this.num = 500 * clientWidth/ 1920;
	  	// 两点绘制线 最小距离
	  	this.distance = clientWidth / 14;
	  	// 两点绘制线 距离鼠标 中心点的距离 范围
	  	this.d_radius = clientWidth / 12;
	  	this.array = [];
	  	this.canvas = {
	  		clientWidth,
	  		clientHeight
	  	}
	  	this.mouseCenter = {
	  		x:MouseX,
	  		y:MouseY
	  	}
	  	// 创建 Dot 组合
	  	this.createDots();
	  	requestAnimationFrame(this.animateDots.bind(this));
	}
	createDots() {
		for(let i = 0; i< this.num ; i++){
			this.array.push(new Dot(this.canvas));
		}
	}
	// 随机移动每一个点
	moveDots(){
		for(let i =0;i<this.num;i++){
			let dot = this.array[i];
			if(dot.y < 0 || dot.y > this.canvas.clientHeight ){
				dot.vy = -dot.vy;
			}
			if(dot.x < 0 || dot.x> this.canvas.clientWidth){
				dot.vx = - dot.vx;
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
		ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
		// 2、 移动所有点
		this.moveDots();
		// 3、 链接所有点
		this.connectDots();
		// 4、 画线 和点
		this.drawDots();
		requestAnimationFrame(this.animateDots.bind(this));
	}
}

class Canvas01 extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	render () {
		if(this.state.DT){
			this.state.DT.mouseCenter = {
				x:this.props.MouseX,
				y:this.props.MouseY
			}
			this.state.DT.canvas ={
				clientWidth:this.props.clientWidth,
				clientHeight:this.props.clientHeight
			}
		}
		return (
			<div className="canvas-background-container">
				<canvas
				ref = {node => {
					canvas = node;
				}}
				width={this.props.clientWidth}
				height={this.props.clientHeight}
				></canvas>
			</div>
		);
	}
	componentDidMount(){
		ctx = canvas.getContext('2d');
		this.setState({
			DT:new Dots({
				clientWidth:this.props.clientWidth,
				clientHeight:this.props.clientHeight,
				MouseX:this.props.MouseX,
				MouseY:this.props.MouseY
			})
		});
	}
	shouldComponentUpdate(nextProps){
		return (this.props.clientHeight !== nextProps.clientHeight
			||
			this.props.clientWidth !== nextProps.clientWidth
			||
			this.props.MouseX !== nextProps.MouseX
			||
			this.props.MouseY !== nextProps.MouseY
		);
	}
}

export default Canvas01;




