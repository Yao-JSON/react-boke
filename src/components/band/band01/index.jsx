import React from 'react';
import bgImg from '../../../images/band01.jpeg';
import classnames from 'classnames';

import './index.less';
class HomeBand01 extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	render(){
	  let clientWidth = this.props.clientWidth;
		return (
			<div className='band01-img-div' style={{minHeight:this.props.clientHeight}}>
				<div className='img'>
					<img src={bgImg}  className={classnames('img-bg','img-responsive')}/>
					<ul className={classnames('band01-label',{'band01-font-pc':clientWidth > 768,'band01-font-yd':clientWidth < 768})}>
						<li>
              Nothing is impossible
              <i className='iconFont icon-YJSON'></i>
            </li>
						<li >没有什么是不可能的</li>
						<li>Created By YJSON.</li>
					</ul>
				</div>
			</div>
		);
	}
	shouldComponentUpdate(nextProps){
		return (this.props.clientHeight !== nextProps.clientHeight || this.props.clientWidth !== nextProps.clientWidth);
	}
}

export default HomeBand01;
