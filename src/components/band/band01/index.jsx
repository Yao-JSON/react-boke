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
		return (
			<div className='img-div' style={{minHeight:this.props.clientHeight}}>
				<div className='img'>
					<img src={bgImg}  className={classnames('img-bg','img-responsive')}/>
					<ul className='label'>
						<li style={{fontSize:'2.6rem',marginTop:'1.8rem'}}>
              Nothing is impossible
              <i className='iconFont icon-YJSON'></i>
            </li>
						<li style={{fontSize:'1.4rem',marginTop:'2rem'}}>没有什么是不可能的</li>
						<li style={{fontSize:'2rem',marginTop:'2rem'}}>Created By YJSON.</li>
					</ul>
				</div>
			</div>
		);
	}
	shouldComponentUpdate(nextProps){
		return (this.props.clientHeight !== nextProps.clientHeight || this.props.rem !== nextProps.rem);
	}
}

export default HomeBand01;
