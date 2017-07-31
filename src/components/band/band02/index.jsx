import React from 'react';
import Grid from 'uxcore-grid';
let { Col , Row } = Grid;
import './index.less';
class HomeBand02 extends React.Component{
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		fonttitle:null
	  	};

	}
	render() {
		let fontTitle = {
			fontSize:`${2.4 * this.props.rem}rem`
		}
		let fontContent = {
			fontSize:`${1.4 * this.props.rem}rem`
		}
		return (
			<Grid fluid={true} className='write'>
				<Row>
					<Col mdOffset={3} md={18} sm={24} xs={24} className='introduction-container'>
						 <ul className='introduction'>
						 	<li style={fontTitle}>About  YJSON</li>
						 	<li style={fontContent}>
						 		<a href='https://baike.baidu.com/item/JSON' target='_blank'>JSON</a>
						 		是一种轻量级的数据交换格式。昵称 YJSON 是取之于我名称的首拼。
						 	</li>
						 	<li style={fontContent}>
						 		90后处女座男青年，爱编程、爱算法、爱折腾、爱运动，喜欢遨游在代码中，手指敲打键盘那种简简单单的感觉；
						 		相信代码是是一种艺术，编程是一种的态度。
						 	</li>
						 	<li style={fontContent}>
						 		Good Good Study Day Day Up
						 	</li>
						 	<li style={fontContent}>
						 		Fighting!!!
						 	</li>
						 </ul>
					</Col>
				</Row>
			</Grid>
		);
	}
	shouldComponentUpdate(nextProps){
		return this.props.rem !== nextProps.rem;
	}
}

export default HomeBand02;