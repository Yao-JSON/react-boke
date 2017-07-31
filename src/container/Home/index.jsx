import React from 'react';
import { connect } from 'react-redux';
import HeaderNav from '../../components/Nav/';
import CanvasBackground from '../../components/canvas/canvas-01';
import HomeBand01 from '../../components/band/band01';
import HomeBand02 from '../../components/band/band02';
import HomeBand03 from '../../components/band/band03';
import './home.less';
class Home extends React.Component{
	constructor(props) {
	  	super(props);
		
	 	this.state = {};
	}
	render(){
		let rem = (1080 * this.props.Resize.clientWidth)/(1920 * this.props.Resize.clientHeight);
		let style = {minHeight:this.props.Resize.clientHeight,position:'relative'};
		let style2 = {minHeight:this.props.Resize.clientHeight*3/4,position:'relative'};
		return (
			<div>
				<div style={style}>
					<HomeBand01
						rem ={rem}
						clientHeight = {this.props.Resize.clientHeight}/>
					<CanvasBackground
						MouseX = {this.props.MouseMove.MouseX || this.props.Resize.clientWidth/2}
						MouseY = {this.props.MouseMove.MouseY || this.props.Resize.clientHeight/2}
						clientWidth = {this.props.Resize.clientWidth}
						clientHeight = {this.props.Resize.clientHeight}/>
					<HeaderNav ScrollTop={this.props.ScrollTop.ScrollTop} clientWidth={this.props.Resize.clientWidth}/>
				</div>
				<div className='flex-align-items-center' style={style2}>
					<HomeBand02 rem={rem}/>
				</div>
				<div style={style2} >
					<HomeBand03 
						rem={rem} 
						clientHeight = {this.props.Resize.clientHeight}/>
				</div>
			</div>
		);
	}
}
let mapStateToProps = (state) => {
	return state;
}
export default connect(mapStateToProps,null)(Home);
