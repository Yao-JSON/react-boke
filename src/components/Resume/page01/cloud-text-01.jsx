import React from 'react'
import './cloud-text-demo.less';
import unit from '../../../units';
import ReactDOM from 'react-dom';
let Skill = require('./skill.json');

Skill = ((arr) => {
  for(let i = 0;i<arr.length;i++){
    arr[i].styleObj = {
      color:unit.randomColor()
    }
  }
  return arr;
})(Skill);

let MouseX = 0 ,
  MouseY = 0,
  skillDom = null, // 容器
  dtr = Math.PI/180,
  distr = true,
  radius = null, // 云半径
  howElliptical = 1,
  size = null,
  d = 300,
  tspeed = 5, // 移动速度
  lasta = 1,
  lastb = 1,
  sinA = 0,
  cosA = 0,
  sinB = 0,
  cosB = 0,
  sinC = 0,
  cosC = 0,
  halfStageW = 0,
  halfStageH = 0,
  active = false; //容器是否激活

class Label extends React.Component{
  constructor(props){
    super(props)
  }
  hanlder(){

  }
  render(){
    return(<a href={this.props.data.link}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hanlder();
              }}
              style={this.props.styleObj}
              title={this.props.data.title}>{this.props.data.title}</a>);
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    let labelArrangeArr = [];
    for(let i = 0;i<Skill.length;i++){
      labelArrangeArr.push({
        styleObj:Skill[i].styleObj,
        pos:{},
        xyz:{}
      });
    }
    this.state = {
      labelArrangeArr
    }
  }
  render(){
    let me = this,labelArr = [];
    Skill.map((value,index) => {
      if(!me.state.labelArrangeArr[index]){
        me.state.labelArrangeArr[index] = {
          styleObj:Object.assign({},{
            top:0,
            left:0
          },value.styleObj)
        }
      }
      labelArr.push(
        <Label data={value}
               styleObj={this.state.labelArrangeArr[index].styleObj}
               ref={'label'+index}
               key={index}/>
      );
    });
    return(<div className='resume-page01-skill'
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
                  active = true;
                  if(skillDom){
                    MouseX = e.pageX - unit.getOffsetLeft(skillDom);
                    MouseY = e.pageY - unit.getOffsetTop(skillDom);
                    MouseX /= 3;
                    MouseY /= 3;

                  }
                }}
                ref='stage'>
      {labelArr}
    </div>);
  }
  componentDidMount(){
    let getSkillDOM = setInterval(() => {
      skillDom = ReactDOM.findDOMNode(this.refs.stage);
      if(!skillDom.offsetWidth){
        return;
      }
      clearInterval(getSkillDOM);
      skillDom = ReactDOM.findDOMNode(this.refs.stage);
      halfStageW = skillDom.offsetWidth /2;
      halfStageH = skillDom.offsetHeight /2;
      radius = skillDom.offsetWidth / 3;
      size = radius * 2;
      this.sineCosine(0,0,0);
      this.positionAll();
      setInterval(() => {
        this.update();
      },60)
    },1000)
    // setTimeout(() => {
    //   skillDom = ReactDOM.findDOMNode(this.refs.stage);
    //   halfStageW = skillDom.offsetWidth /2;
    //   halfStageH = skillDom.offsetHeight /2;
    //   radius = skillDom.offsetWidth / 3;
    //   size = radius * 2;
    //   this.sineCosine(0,0,0);
    //   this.positionAll();
    //
    //   setInterval(() => {
    //     this.update();
    //   },60)
    // },1000);
  }
  update(){
    let a , b , c = 0;
    if(active){
      a = (-Math.min( Math.max( -MouseY, -size ), size ) / radius ) * tspeed;
      b = (Math.min( Math.max( -MouseX, -size ), size ) / radius ) * tspeed;
    }else {
      a = lasta * 0.98;
      b = lastb * 0.98;
    }

    lasta=a;
    lastb=b;

    if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01) {
      return;
    }
    this.sineCosine(a,b,c);
    let labelArrangeArr = [];
    let labeArr = this.state.labelArrangeArr;
    for(let i = 0;i<labeArr.length;i++){
      let rx1=labeArr[i].xyz.cx;
      let ry1=labeArr[i].xyz.cy * cosA+labeArr[i].xyz.cz*(-sinA);
      let rz1=labeArr[i].xyz.cy*sinA+labeArr[i].xyz.cz*cosA;

      let rx2=rx1*cosB+rz1*sinB;
      let ry2=ry1;
      let rz2=rx1*(-sinB)+rz1*cosB;

      let rx3=rx2*cosC+ry2*(-sinC);
      let ry3=rx2*sinC+ry2*cosC;
      let rz3=rz2;

      labeArr[i].xyz.cx = rx3;
      labeArr[i].xyz.cy = ry3;
      labeArr[i].xyz.cz = rz3;

      let per=d/(d+rz3);

      labeArr[i].xyz.x=(howElliptical*rx3*per)-(howElliptical*2);
      labeArr[i].xyz.y=ry3*per;
      labeArr[i].pos.scale=per;
      labeArr[i].pos.alpha=per;

      labeArr[i].pos.alpha=(labeArr[i].pos.alpha-0.6)*(10/6);
      labelArrangeArr.push(labeArr[i]);
    }
    this.doPosition(labelArrangeArr);
  }
  doPosition(arr){
    let labelArrangeArr = [];
    for(let i = 0;i<arr.length;i++){
        let obj = {
          left:arr[i].xyz.cx+ halfStageW -30,
          top:arr[i].xyz.cy+ halfStageH -10,
          fontSize:Math.ceil(12 * arr[i].pos.scale/2)+8,
          filter:'alpha(opacity='+ (100 * arr[i].pos.alpha) +')',
          opacity:arr[i].pos.alpha
        };
        arr[i].styleObj = Object.assign({},arr[i].styleObj,obj);
        labelArrangeArr.push(arr[i]);
    }
    this.setState({
      labelArrangeArr
    });
  }
  positionAll(){
    let phi = 0;
    let theta = 0;
    let max=Skill.length;
    let labelArrangeArr = [];
    for(let i = 1;i< max+1;i++){
      if(distr){
        phi = Math.acos(-1+(2*i-1)/max);
        theta = Math.sqrt(max*Math.PI)*phi;
      }else{
        phi = Math.random()*(Math.PI);
        theta = Math.random()*(2*Math.PI);
      }
      let xyz = {
        cx: radius * Math.cos(theta)*Math.sin(phi),
        cy: radius * Math.sin(theta)*Math.sin(phi),
        cz: radius * Math.cos(phi)
      };
      let obj = {
        left:xyz.cx+skillDom.offsetWidth/2 - 50,
        top:xyz.cy+skillDom.offsetWidth/2 - 30
      };
      let styleObj = Object.assign({},this.state.labelArrangeArr[i-1].styleObj,obj);
      labelArrangeArr.push({
        xyz,
        styleObj,
        pos:{}
      })
    }
    this.setState({
      labelArrangeArr
    });
  }
  sineCosine(a,b,c){
    sinA = Math.sin(a * dtr);
    cosA = Math.cos(a * dtr);
    sinB = Math.sin(b * dtr);
    cosB = Math.cos(b * dtr);
    sinC = Math.sin(c * dtr);
    cosC = Math.cos(c * dtr);
  }
}
export default App;
