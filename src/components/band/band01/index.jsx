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
						<li style={{fontSize:(this.props.rem * 3.2) + 'rem',marginTop:(this.props.rem * 3) +'rem'}}>Nothing is impossible!</li>
						<li style={{fontSize:(this.props.rem * 1.8) + 'rem',marginTop:(this.props.rem * 3) +'rem'}}>没有什么是不可能的</li>
						<li style={{fontSize:(this.props.rem * 2.4) + 'rem',marginTop:(this.props.rem * 3) +'rem'}}>Created By YJSON.</li>
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