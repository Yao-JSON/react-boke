import React from 'react'
import Icon from 'uxcore-icon';
import { Link } from 'react-router';
import './return.less';
import classnames from 'classnames';

class Return extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
      let clientWidth = this.props.clientWidth;
      let ScrollTop = this.props.ScrollTop;
      if(clientWidth < 768){
        return (
          <div className={classnames('others-Return',{'others-fixed-Return':ScrollTop >20})} style={{backgroundColor:this.props.bgColor}}>
            <Link to={this.props.link}>
              <Icon name="left" />
              <span>返回</span>
            </Link>
          </div>
        )
      }
      return <div></div>;
  }
  shouldComponentUpdate(nextProps){
    return (this.props.clientWidth !== nextProps.clientWidth
    ||
    this.props.ScrollTop !== nextProps.ScrollTop)
  }
}
Return.PropTypes={
  bgColor:React.PropTypes.string,
  link:React.PropTypes.string,
  clientWidth:React.PropTypes.number,
  ScrollTop:React.PropTypes.number
};
export default Return;
