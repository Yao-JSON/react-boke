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
		link:'boke/home'
	},
	{
		title:'联系我',
		link:'contact'
	}
];
function Cover(props){
  let me = props.me;
  if(props.navMenu){
    return (<div onClick={me.toggleMenu.bind(me)} className='Nav-cover'></div>);
  }
  return <i></i>;
}

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
			<Grid fluid={true} className='nav-top-parent'>
				<Row className = {classNames('nav',{'nav-border nav-native':this.props.clientWidth >768?false:true ,'nav-border2 nav-native':this.props.ScrollTop>100?true:false})} >
					<NavLeft clientWidth={this.props.clientWidth} />
					<NavRight clientWidth={this.props.clientWidth} me ={this}/>
					<Col xs={24} sm={24} className = {classNames('navMenu',{'navMenu-height-150':this.state.navMenu})}>
            <Cover navMenu={this.state.navMenu} me={this}/>
						<ul className='menu-item'>{
							NavArr.map((value,index) => {
								return (
                  <Link key={index} to={value.link}>
                    <li >
                      {value.title}
                    </li>
                  </Link>
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
