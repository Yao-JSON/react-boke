import React from 'react'
import Grid from 'uxcore-grid';
let { Row , Col } = Grid;
const Tag = require('uxcore-tag');
const { Item } = Tag;
import './index.less';
import {VueLogo,ReactLogo,NodeLogo,jQueryLogo } from '../../../units/logo-img';
import Icon from 'uxcore-icon';
let ProjectImg = (props) => {
  if(!props.imgSrc.default){
    return(
      <div>
        <div className='img-container-no-default'>
          <img src={props.imgSrc.imgSrc}/>
        </div>
      </div>);
  }
  return(
    <div>
      <div className='img-container-default'>
        <img src={props.imgSrc.imgSrc}/>
      </div>
      <div className='img-project-title'>{props.title}</div>
    </div>);
}

class ProjectBar extends React.Component{
  constructor(props){
    super(props);

  }
  filterImg(){
    if(this.props.img){
      switch(this.props.img){
        case 'vue':
          return {imgSrc:VueLogo,default:false};
        case 'react':
          return {imgSrc:ReactLogo,default:false};
        case 'node':
          return{imgSrc:NodeLogo,default:false};
        case 'jQuery':
          return{imgSrc:jQueryLogo,default:false};
        default:
          return {imgSrc:this.props.img,default:false};
      }
    }else{
      return {imgSrc:VueLogo,default:true};
    }
  }
  render(){
    let imgSrc =  this.filterImg();
    return (<Row className='boke-home-project'>
        <Col xs={6} >
          <ProjectImg imgSrc={imgSrc} title={this.props.title}/>
        </Col>
        <Col xs={18}>
          <div className='boke-home-project-bar'>
            <ul>
              <li className='project-title clear'>
                <div className='label'>
                  名称：
                </div>
                <div className='content'>
                  {this.props.title}
                </div>
              </li>
              <li className='project-description clear'>
                <div className='label'>
                  描述：
                </div>
                <div className='content'>
                  {this.props.description}
                </div>
              </li>
              <li className='project-link clear'>
                <div className='label'>
                  链接：
                </div>
                <div className='content'>
                  <a href={this.props.link} target='_blank'>{this.props.link}</a>
                </div>
              </li>
              <li className='project-link clear'>
                <div className='label'>
                  示例：
                </div>
                <div className='content'>
                  <a href={this.props.demo} target='_blank'>{this.props.demo}</a>
                </div>
              </li>
              <li className='project-label clear'>
                <div className='label'>标签：</div>
                <div className='content'>
                  <Tag addTags={false}>
                    {
                      this.props.label.map((value,index) => {
                        return(<Item type='success' key={index} >{value}</Item>);
                      })
                    }
                  </Tag>
                </div>
              </li>
            </ul>
            <div className='calendar'>
              <Icon name="riqi" />
              <span>{this.props.time}</span>
            </div>
          </div>
        </Col>
      </Row>);
  }
}

ProjectBar.PropTypes ={
  img:React.PropTypes.string,
  label:React.PropTypes.array,
  description:React.PropTypes.string,
  title:React.PropTypes.title
};

export default ProjectBar;





