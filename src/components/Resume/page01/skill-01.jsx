import React from 'react'
import skill from './skill.json';
import utils from '../../../units';
import CoudText from './cloud-text-demo';
let MouseX = 0 ,
  MouseY = 0,
  skillDom = null, // 容器
  dtr = Math.PI/180,
  distr = true,
  radius = null, // 云半径
  allList = [],
  howElliptical = 1,
  size = null,
  d = 300,
  tspeed = 5, // 移动速度
  allA = [], //所有的A标签
  lasta = 1,
  lastb = 1,
  sinA = 0,
  cosA = 0,
  sinB = 0,
  cosB = 0,
  sinC = 0,
  cosC = 0,
  active = false; //容器是否激活

class Skill extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    for(let i =0;i<skill.length;i++){
      this.state['style'+i] = {color:this.randomColor(),fontSize:this.randomFontSize()};
    }
  }
  randomColor(){
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return `rgb(${r},${g},${b})`;
  }
  randomFontSize(){
    return (Math.random() * 2 + 0.4)+'rem';
  }
  render(){
    return(<div className='resume-page01-front'>
      <div className='resume-page01-front-title'>技术栈</div>
      <CoudText className='resume-page01-skill'/>
      <div className='resume-page01-skill'
           onMouseEnter={(e) => {
             e.preventDefault();
             e.stopPropagation();
             active = true
           }}
           onMouseOut={(e) => {
             e.preventDefault();
             e.stopPropagation();
             active = false;
           }}
           onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             if(skillDom){
               MouseX = e.pageX - utils.getOffsetLeft(skillDom);
               MouseY = e.pageY - utils.getOffsetHeight(skillDom);
               MouseX /= 5;
               MouseY /= 5;
             }
             this.update()
           }}
           ref={(node) => {skillDom = node}}>
        {
          skill.map((value,index) => {
            return (<a href={value.link}
                       key={index.toString()}
                       style={this.state['style'+index]}
                       alt={value.title}>{value.title}</a>);
          })
        }
      </div>
    </div>);
  }
  sincos(a,b,c){
    sinA = Math.sin(a * dtr);
    cosA = Math.cos(a * dtr);
    sinB = Math.sin(b * dtr);
    cosB = Math.cos(b * dtr);
    sinC = Math.sin(c * dtr);
    cosC = Math.cos(c * dtr);
  }
  update(){
    let a;
    let b;
    if(active){
      a = (-Math.min( Math.max( -MouseY, -size ), size ) / radius ) * tspeed;
      b = (Math.min( Math.max( -MouseX, -size ), size ) / radius ) * tspeed;
    }else{
      a = lasta * 0.98;
      b = lastb * 0.98;
    }

    lasta=a;
    lastb=b;

    if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01){
      return;
    }

    let c=0;
    this.sincos(a,b,c);
    for(let j=0;j<allList.length;j++){
      let rx1=allList[j].cx;
      let ry1=allList[j].cy * cosA+allList[j].cz*(-sinA);
      let rz1=allList[j].cy * sinA+allList[j].cz*cosA;

      let rx2=rx1*cosB+rz1*sinB;
      let ry2=ry1;
      let rz2=rx1*(-sinB)+rz1*cosB;

      let rx3=rx2*cosC+ry2*(-sinC);
      let ry3=rx2*sinC+ry2*cosC;
      let rz3=rz2;

      allList[j].cx=rx3;
      allList[j].cy=ry3;
      allList[j].cz=rz3;

      let per=d/(d+rz3);
      allList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
      allList[j].y=ry3*per;
      allList[j].scale=per;
      allList[j].alpha=per;
      allList[j].alpha=(allList[j].alpha-0.6)*(10/6);
    }
    console.log(this.state)
    this.doPosition();
    this.depthSort();
  }
  pageLoaded(){ // 页面加载完成
    let AS =  skillDom.getElementsByTagName('a');
    allA = [];
    for(let i =0;i<AS.length;i++){
      allA.push({
        index:i,
        DOM:AS[i]
      })
    }
    radius = skillDom.offsetWidth/4;
    size = radius * 2;
    allList = [];
    for(let i = 0;i<allA.length;i++){
      let Tag = {
        offsetWidth:allA[i].DOM.offsetWidth,
        offsetHeight:allA[i].DOM.offsetHeight,
        index:i
      };
      allList.push(Tag);
    }
    this.sincos(0,0,0);
    this.positionAll();
    this.update();
    //setInterval(this.update.bind(this),60);
  }
  doPosition(){//定位云字体
    var l=skillDom.offsetWidth/2;
    var t=skillDom.offsetHeight/2;
    for(let i=0;i<allList.length;i++){
      let obj;
      let objectStyle = {};
      let style = this.state['style'+i];
      obj= {
        left:allList[i].cx+l-allList[i].offsetWidth/2+'px',
        top:allList[i].cy+t-allList[i].offsetHeight/2+'px',
        filter:"alpha(opacity="+100*allList[i].alpha+")",
        opacity:allList[i].alpha
      };
      objectStyle['style'+i] = Object.assign({},style,obj);
      this.setState(objectStyle);
    }
  }
  depthSort(){
    var aTmp=[];

    for(let i=0;i<allA.length;i++){

      aTmp.push(allA[i]);
    }

    aTmp.sort(function (vItem1, vItem2) {
        if(vItem1.cz>vItem2.cz)
        {
          return -1;
        } else if(vItem1.cz<vItem2.cz) {
          return 1;
        } else {
          return 0;
        }
      }
    );

    // for(let i=0;i<aTmp.length;i++){
    //
    //   aTmp[i].style.zIndex=i;
    // }
  }
  positionAll(){
    var phi=0;
    var theta=0;
    var max=allList.length;

    var aTmp=[];
    var oFragment=document.createDocumentFragment();

    for(let i=0;i<allA.length;i++){
      aTmp.push(allA[i]);
    }

    aTmp.sort(function () {
        return Math.random()<0.5?1:-1;
    });

    for(let i=0;i<aTmp.length;i++){
      oFragment.appendChild(aTmp[i].DOM);
    }

    skillDom.appendChild(oFragment);

    for( var i=1; i<max+1; i++){
      if( distr )
      {
        phi = Math.acos(-1+(2*i-1)/max);
        theta = Math.sqrt(max*Math.PI)*phi;
      }
      else
      {
        phi = Math.random()*(Math.PI);
        theta = Math.random()*(2*Math.PI);
      }
      allList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
      allList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
      allList[i-1].cz = radius * Math.cos(phi);
      let obj;
      let objectStyle = {};
      let style = this.state['style'+i];
      obj= {
        left:allList[i-1].cx+skillDom.offsetWidth/2-allList[i-1].offsetWidth/2+'px',
        top:allList[i-1].cy+skillDom.offsetHeight/2-allList[i-1].offsetHeight/2+'px'
      };
      objectStyle['style'+i] = Object.assign({},style,obj);
      this.setState(objectStyle);
    }
  }
  componentDidMount(){
    // setTimeout(() => {
    //   this.pageLoaded()
    // },1000)
  }
}

export default Skill;
