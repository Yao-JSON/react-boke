import React from 'react'
import './index.less';
import classnames from 'classnames';
import Icon from 'uxcore-icon';
import ImgUserHeader from '../../../images/band01.jpeg';
import navJson from './left-nav.json';
import { Link } from 'react-router';
import YDReturn from '../../oterts/return';
class Header extends React.Component{
  constructor(props){
      super(props);
  }
  render(){
    let clientWidth = this.props.clientWidth;
    return (
      <div>
          <YDReturn bgColor='#333' link='/' ScrollTop={this.props.ScrollTop} clientWidth={clientWidth} />
          <div className={classnames('left-nav clear',{'left-nav-header-180':clientWidth>768?true:false,'left-nav-header-110':clientWidth<=768?true:false})}>
            <div className='left-home-nav-img-container'>
              <img src={ImgUserHeader} alt="用户头像"/>
            </div>
          </div>
      </div>

    );
  }
  shouldComponentUpdate(nextProps){
      return (this.props.clientWidth !== nextProps.clientWidth
      ||
      this.props.ScrollTop !== nextProps.ScrollTop);
  }
}

function PcIcon (props) {
  if(props.clientWidth > 768){
    return <Icon name={props.icon}/>
  }
  return <i></i>;
}
class PCMenu extends React.Component{
  constructor(props){
    super(props)
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
    let clientWidth = this.props.clientWidth;
    return(
      <ul className={classnames('body-nav-title',{'boke-body-YD-title clear':clientWidth<=768})}>
        {
          navJson.menu.map((value,index) => {
            return (
              <Link key={index} to={value.path}  onClick={() => {
                this.handler(index);
              }}>
                <li  className={classnames({li:clientWidth>768,'activeClassName':this.state.current === index})}>
                  <PcIcon clientWidth ={clientWidth} icon={value.icon}/>
                  <span>{value.title}</span>
                </li>
              </Link>
            );
          })
        }
      </ul>
    )
  }
  shouldComponentUpdate(nextProps,nextState){
    return(
      this.props.clientWidth !== nextProps.clientWidth
      ||
      this.props.current !== nextState.current
    );
  }
}

class Body extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current:0
    }
  }
  render(){
    let clientWidth = this.props.clientWidth;
    return(
      <div className='left-body'>
        <div className='body-title'>
          <p className='TC'>YJSON</p>
          <p className='TC'>剑锋所指，所向披靡</p>
          <p className='TR'>——亮剑</p>
        </div>
        <div className={classnames('body-nav',{'body-nav-padding-right-15':clientWidth>768})}>
          <div className='body-nav-iocn'>
            <Icon name='liucheng' />
          </div>
          {
            <PCMenu clientWidth={clientWidth}/>
          }
          <ul className={classnames('boke-www-link', 'flex','flex-justify-content-center',
            {'boke-www-link-li-5px':clientWidth<768})}>
            {
              navJson.btn_link.map((value , index) => {
                return (
                  <li key={index}>
                    <a href={value.link}>
                      <i className={classnames('iconfont',value.icon)}></i>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps){
    return (
      this.props.clientWidth !== nextProps.clientWidth
    );
  }
}


export default class extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
        <div className='boke-nav'>
          <Header ScrollTop={this.props.ScrollTop} clientWidth={this.props.clientWidth}/>
          <Body   clientWidth={this.props.clientWidth}/>
        </div>
    );
  }
  shouldComponentUpdate(nextProps){
    return (this.props.clientWidth !== nextProps.clientWidth
      ||
    this.props.ScrollTop !== nextProps.ScrollTop);
  }
}



