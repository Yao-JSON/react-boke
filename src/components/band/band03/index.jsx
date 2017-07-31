import React from 'react';
import Grid from 'uxcore-grid';
let {Row,Col} = Grid;
import './index.less';
import Canvas2 from '../../canvas/canvas-02.jsx';


class HomeBand03 extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	render(){
		let style = {minHeight:this.props.clientHeight}
		return (
			<Grid fluid={true}>
				<Row>
					<Col mdOffset={3} md={18} sm={24} xs={24} style={style}>
						<Canvas2
						clientWidth = {this.props.clientWidth} 
						clientHeight={this.props.clientHeight}/>
					</Col>
				</Row>
			</Grid>
		);
	}
	shouldComponentUpdate(nextProps){
		return (
			this.props.clientHeight !== nextProps.clientHeight 
			|| 
			this.props.rem !== nextProps.rem
			||
			this.props.clientWidth !== nextProps.clientWidth);
	}
}

export default HomeBand03;