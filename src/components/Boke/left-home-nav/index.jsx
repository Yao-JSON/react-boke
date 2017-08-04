import React from 'react'
import './index.less';
import classnames from 'classnames';
import Icon from 'uxcore-icon';
import ImgUserHeader from '../../../images/band01.jpeg';
import navJson from './left-nav.json';
import { Link } from 'react-router';
let Menu = require('uxcore-menu');
var MenuItem = Menu.Item;
class Header extends React.Component{
  constructor(props){
      super(props);
  }
  render(){
    return (
      <div className={classnames('left-nav',{'left-nav-header-180':this.props.clientWidth>768?true:false})}>
        <div className='left-home-nav-img-container'>
          <img src={ImgUserHeader} alt="用户头像"/>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps){
      return (this.props.clientWidth !== nextProps.clientWidth);
  }
}

class PCMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current:'0'
    }
  }
  handler(e){
    this.setState({
      current:e.key
    });
  }
  render(){
    return(
      <Menu
        className='PC-menu'
        selectedKeys={[this.state.current]}
        onClick={(e) => {
          this.handler(e);
        }}>
        {

        }
      </Menu>
    )
  }
}
class YDMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      current:'0'
    }
  }
  handler(e){
    this.setState({
      current:e.key
    });
  }
  render(){
    return(
      <Menu
        selectedKeys={[this.state.current]}
        onClick={(e) =>{
        this.handler(e);
      }}>
        {
          navJson.menu.map((value,index) => {
            return (
              <MenuItem key={index}>
                <i className="kuma-icon kuma-icon-wangwang"></i>
                <Link to={value.path}  >{value.title}</Link>
              </MenuItem>
            );
          })
        }
      </Menu>
    )
  }
}

class Body extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current:0
    }
  }
  handler(index){
    this.setState({
      current:index
    });
  }
  render(){
    return(
      <div className='left-body'>
        <div className='body-title'>
          <p className='TC'>YJSON</p>
          <p className='TC'>剑锋所指，所向披靡</p>
          <p className='TR'>————亮剑</p>
        </div>
        <div className='body-nav'>
          <div className='body-nav-iocn'>
            <Icon name='liucheng' />
          </div>
          <ul className='body-nav-title'>
            {
              this.props.clientWidth>768?navJson.menu.map((value,index) => {
                return (
                  <Link to={value.path}  onClick={() => {
                    this.handler(index);
                  }}>
                    <li key={index} className={classnames('li',{'activeClassName':this.state.current === index})}>
                      <Icon name={value.icon} />
                      <span>{value.title}</span>
                    </li>
                  </Link>
                );
              }):<YDMenu/>
            }
          </ul>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps,nextState){
    return (
      this.props.clientWidth !== nextProps.clientWidth
      ||
      this.state.current !== nextState.current
    );
  }
}


export default class extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
        <div style={{height:'100vh'}}>
          <Header clientWidth={this.props.clientWidth}/>
          <Body   clientWidth={this.props.clientWidth}/>
        </div>
    );
  }
  shouldComponentUpdate(nextProps){
    return (this.props.clientWidth !== nextProps.clientWidth);
  }
}



