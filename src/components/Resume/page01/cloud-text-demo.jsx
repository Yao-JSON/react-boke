import React from 'react'
import './cloud-text-demo.less';
import utils from '../../../units';
import skill from './skill.json';

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


let randomColor = () => {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return `rgb(${r},${g},${b})`;
};
class Text extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let styleObj = {};
    return(<a href={this.props.link}
              style={styleObj}
              ref={(node) => {
                skill[this.props.index].offsetWidth = node.offsetWidth;
                skill[this.props.index].offsetHeight = node.offsetHeight;
              }}
              title={this.props.title}>{this.props.title}</a>);
  }
}
skill.map((value) => {
  value.color = randomColor();
});
class CloudText extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isPositionAll:false,
      update:0
    }
  }
  render(){
    return(<div
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
      onMouseMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(skillDom){
          MouseX = e.pageX - utils.getOffsetLeft(skillDom);
          MouseY = e.pageY - utils.getOffsetTop(skillDom);
          MouseX /= 5;
          MouseY /= 5;
        }
      }}
      className='resume-page01-skill' ref={(node) => {skillDom = node}}>
      {

        skill.map((value,index) => {
          let styleObj = {
            top:value.top,
            left:value.left,
            opacity:value.opacity,
            color:value.color,
            fontSize:value.fontSize,
            zIndex:index
          };
          return(<a href={value.link}
                    style={styleObj}
                    ref = {(node) => {
                      if(!node){
                        return;
                      }
                      value.offsetWidth = node.offsetWidth;
                      value.offsetHeight = node.offsetHeight;
                    }}
                    title={value.title}
                    key={index}>{value.title} </a>);
        })
      }
    </div>);
  }
  //组件加载完成初始化计算每一个 云字体组件的位置
  componentDidMount(){
    // 计算舞台的大小
    //skillDom = ReactDom.findDOMNode(this.refs.stage);
    if(!skillDom){return};
    setTimeout(() => {
      radius = skillDom.offsetWidth / 4;
      size = radius * 2;
      console.log(radius);
      this.sincos( 0,0,0 );
      this.positionAll();
      // setInterval(() => {
      //   this.updatePos();
      // }, 30);
    },1000)

  }
  // 更新组件
  updatePos(){
    let a;
    let b;

    if(active)
    {
      a = (-Math.min( Math.max( -MouseY, -size ), size ) / radius ) * tspeed;
      b = (Math.min( Math.max( -MouseX, -size ), size ) / radius ) * tspeed;
    }
    else
    {
      a = lasta * 0.98;
      b = lastb * 0.98;
    }

    lasta=a;
    lastb=b;

    if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01) {
      return;
    }

    let c=0;
    this.sincos(a,b,c);

    for(let j=0;j<skill.length;j++){
      let rx1=skill[j].cx;
      let ry1=skill[j].cy*cosA+skill[j].cz*(-sinA);
      let rz1=skill[j].cy*sinA+skill[j].cz*cosA;

      let rx2=rx1*cosB+rz1*sinB;
      let ry2=ry1;
      let rz2=rx1*(-sinB)+rz1*cosB;

      let rx3=rx2*cosC+ry2*(-sinC);
      let ry3=rx2*sinC+ry2*cosC;
      let rz3=rz2;

      skill[j].cx = rx3;
      skill[j].cy = ry3;
      skill[j].cz = rz3;

      let per=d/(d+rz3);

      skill[j].x=(howElliptical*rx3*per)-(howElliptical*2);
      skill[j].y=ry3*per;
      skill[j].scale=per;
      skill[j].alpha=per;

      skill[j].alpha=(skill[j].alpha-0.6)*(10/6);
    }
    this.doPosition();
  }
  // 定位所有
  positionAll(){
    let phi = 0;
    let theta = 0;
    let max=skill.length;

    for(let i =1;i<max+1;i++){
      if(distr){
        phi = Math.acos(-1+(2*i-1)/max);
        theta = Math.sqrt(max*Math.PI)*phi;
      }else{
        phi = Math.random()*(Math.PI);
        theta = Math.random()*(2*Math.PI);
      }
      // 坐标变换
      skill[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
      skill[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
      skill[i-1].cz = radius * Math.cos(phi);
      skill[i-1].left = skill[i-1].cx + skillDom.offsetWidth/2-skill[i-1].offsetWidth/2;
      skill[i-1].top = skill[i-1].cy+skillDom.offsetHeight/2-skill[i-1].offsetHeight/2;
    }
    this.setState({
      isPositionAll:true
    });
  }
  // 去定位
  doPosition(){
    let l = skillDom.offsetWidth / 2;
    let t = skillDom.offsetHeight / 2;
    for(let i = 0;i<skill.length;i++){
      skill[i]= Object.assign({},skill[i],{
        left:skill[i].cx+l-skill[i].offsetWidth/2,
        top:skill[i].cy+t-skill[i].offsetHeight/2,
        fontSize:Math.ceil(12*skill[i].scale/2)+8,
        filter:"alpha(opacity="+ (100 * skill[i].alpha) +")",
        opacity:skill[i].alpha
      })
    }
  }
  // sineCosine
  sincos(a,b,c){
    sinA = Math.sin(a * dtr);
    cosA = Math.cos(a * dtr);
    sinB = Math.sin(b * dtr);
    cosB = Math.cos(b * dtr);
    sinC = Math.sin(c * dtr);
    cosC = Math.cos(c * dtr);
  }
}
export default CloudText;
