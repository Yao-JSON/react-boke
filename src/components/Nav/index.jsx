import React from 'react';
import Grid from 'uxcore-grid';
import classNames from 'classnames';
import {Link} from 'react-router';
let { Row , Col} = Grid;
let NavRight = require('./NavRight').default;
let NavLeft = require('./NavLeft').default;
import './nav.less';
let NavArr = [
	{
		title:'关于我',
		link:'about'
	},
	{
		title:'博客',
		link:'boke'
	},
	{
		title:'联系我',
		link:'contact'
	}
];
class HeaderNav extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			navMenu:false
		};
	}
	toggleMenu() {
		this.setState({
			navMenu: !this.state.navMenu
		});
	}
	render(){
		return (
			<Grid fluid={true}>
				<Row className = {classNames('nav',{'nav-border':this.props.clientWidth >768?false:true ,'nav-border2':this.props.ScrollTop>100?true:false})} >
					<NavLeft clientWidth={this.props.clientWidth} />
					<NavRight clientWidth={this.props.clientWidth} me ={this}/>
					<Col xs={24} sm={24} className = {classNames('navMenu',{'navMenu-height-150':this.state.navMenu})}>
						<ul className='menu-item'>{
							NavArr.map((value,index) => {
								return (
									<li key={index}>
										<Link to={value.link}>{value.title}</Link>
									</li>
								);
							})
						}</ul>
					</Col>
				</Row>
			</Grid>
		)
	}
	shouldComponentUpdate(nextProps,nextState){
		return (this.props.ScrollTop !== nextProps.ScrollTop
			||
			this.props.clientWidth !== nextProps.clientWidth
			||
			this.props.navMenu !== nextState.navMenu);
	}
}

export default  HeaderNav;