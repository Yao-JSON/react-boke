import React from 'react';
import './index.less';
import ButtonLink from './button-link.json';
import classnames from 'classnames';
import Grid from 'uxcore-grid';
let { Row,Col } = Grid
let Button = React.createClass({
	propTypes:{
		text:React.PropTypes.string,
		icon:React.PropTypes.string,
		link:React.PropTypes.string
	},
	render(){
		return(
			<button>
        <i className={classnames('iconfont',this.props.icon)}></i>
        <a href={this.props.link}>
          {this.props.text}
        </a>
			</button>
		);
	}
});

let ContactMe = React.createClass({
	render(){
		return (
			<div {...this.props}>
				<p>联系我</p>
				<p>爱前端、爱编程、爱极客；欢迎采用以下方式联系我</p>
				<p>
          <a href="mailto:yjson921305@gmail.com?subject=LOVE YOU">yjson921305@gmail.com</a>
        </p>
			</div>
		);
	}
});

export default  class extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = {};
	}
	render(){
		return(
			<div className='contacte-me'>
				<ContactMe className='contact-style'/>
          <Grid className="icon-container" fluid={true}>
            <Row>
              <Col mdOffset={4} md={16} sm={24} xs={24}>
                {
                  ButtonLink.map((v,i) => {
                    return <Button {...v} key={i}/>;
                  })
                }
              </Col>
            </Row>
          </Grid>
			</div>
		);
	}
	componentDidMount(){
		console.log(arguments);
	}
	shouldComponentUpdate(nextProps,nextState){

    return (this.props.clientWidth !== nextProps.clientWidth
      || this.props.clientHeight !== nextProps.clientHeight);
	}
}
