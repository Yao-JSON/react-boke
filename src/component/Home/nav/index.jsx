import React from 'react';
import Grid from 'uxcore-grid';
import {Link} from 'react-router';
import classNames from 'classnames';
let {Row,Col} = Grid;
import './index.less';
let navArr = [
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

let navList = navArr.map((vaule,index) => {
	return (
		<li key={index} className="lt navbar-li">
			<Link to={vaule.link}>{vaule.title}</Link>
		</li>
	);
});

const NavRight = function(props) {
  const isLoggedIn = props.isRender;
  if (!isLoggedIn) {
    return (
	    <Col sm={8} xs={8}>
	    	<button type='secondary' className="navbar-toggle-btn">
		    	<span className="icon-bar"></span>
		    	<span className="icon-bar"></span>
		    	<span className="icon-bar"></span>
		    </button>
	    </Col>
	);
  }
  return (
  		<Col md={16} sm={8} xs={8}>
			<ul className='clear rt navBar'>
				{ navList }
			</ul>
		</Col>);
}

class Nav extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	md:4,
	  	sm:20,
	  	offsetWidth:0
	  };
	}
	componentDidMount(){
		this.calculationOffsetWidth();
		window.addEventListener('resize',(e) => {
			e.preventDefault();
			e.stopPropagation();
			this.calculationOffsetWidth();
		})
	}
	calculationOffsetWidth(){
		let w = document.body.offsetWidth;
		this.setState({
			offsetWidth:w
		});
	}
	render(){
		return (
			<div>
				<Grid fluid={true}>
					<Row className={classNames('nav',{'nav-border':this.state.offsetWidth >768 ? false:true})}>
						<Col mdOffset={2} md={4} sm={16} xs={16}>
							<span className="logo-name">
								YJSON
							</span>
						</Col>
						<NavRight isRender={this.state.offsetWidth > 768 ? true : false}/>
					</Row>
				</Grid>
			</div>
		);
	}
}
export default Nav;
