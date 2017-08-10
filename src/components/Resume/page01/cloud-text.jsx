import React from 'react'
let  Skill = require( './skill.json');
import ReactDOM from 'react-dom';
import unit from '../../../units';
import './cloud-text.less';

let randomColor = () => {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return `rgb(${r},${g},${b})`;
};
let randomFontSize = () => {
  return Math.random() * 2 + 0.6+'rem';
};
Skill = ((arr) => {
  for(let i = 0;i<arr.length;i++){
    arr[i].isCenter = false;
    arr[i].styleObj={
      color:randomColor()
    }
  }
  return arr;
})(Skill);

class Label  extends React.Component{
  constructor(props){
    super(props);
  }
  /*
  *  点击文字 居中
  * */
  handleClick(){
    // 如果当前链接 居中  不做处理
    if(!this.props.arrange.isCenter){
      this.props.center()
    }
  }
  render(){
   let styleObj = {};
    if(this.props.arrange){
      styleObj = this.props.arrange.styleObj;
    }
    if(this.props.isCenter){
      styleObj.zIndex = 11;
    }
    return(<a href={this.props.link}
              style={styleObj}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleClick();
              }}
              title={this.props.data.title}>
            {this.props.data.title}</a>);
  }
}

let Constant={
  centerPos:{
    left:0,
    right:0
  },
  hPosRange:{// 水平方向的取值范围
    leftSecX:[0,0],
    rightSecX:[0,0],
    y:[0,0]
  },
  vPosRange:{ // 垂直方向的取值范围
    x:[0,0],
    topY:[0,0]
  }
};

class cloudText extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      labelArrangeArr:[]
    }
  }
  render(){
    let labelArr = [];
    let me = this;
    Skill.map((value,index) => {
      if(!me.state.labelArrangeArr[index]){
        me.state.labelArrangeArr[index] = {
          styleObj:Object.assign({},{
            left:0,
            top:0
          },value.styleObj),
          isCenter:false
        };
      }
      labelArr.push(
        <Label data={value}
               arrange = {this.state.labelArrangeArr[index]}
               center={this.center(index)}
               ref={'label'+index}
               key={index}/>
      );
    });
    return (<div className='resume-page01-skill' ref='stage'>
      {labelArr}
    </div>);
  }
  /*
   * 利用arrange函数， 居中对应index的图片
   * @param index, 需要被居中的图片对应的图片信息数组的index值
   * @returns {Function}
   */
  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }
  /*
  *  布局所有标签
  *  @param centerIndex 指定居中排布那一个图片
  * */
  rearrange(centerIndex){
    let labelArrangeArr = this.state.labelArrangeArr,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      labelArrangeTopArr = [],
      topLabelNum = Math.floor(Math.random() * 2),    // 取一个或者不取 （主要用于在舞台上方取图）
      topLabelSpliceIndex = 0,
      labelArrangeCenterArr = labelArrangeArr.splice(centerIndex,1);

      // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
      labelArrangeCenterArr[0] = {
        styleObj:Object.assign({},labelArrangeArr[0].styleObj,centerPos),
        rotate: 0,
        isCenter: true
      };

      // 取出要布局的上侧的标签信息
      topLabelSpliceIndex = Math.ceil(Math.random() * (labelArrangeArr.length - topLabelNum));
      labelArrangeTopArr = labelArrangeArr.splice(topLabelSpliceIndex,topLabelNum);

      //布局位于上侧的标签
      labelArrangeTopArr.forEach(function (value, index) {
       labelArrangeTopArr[index] = {
          styleObj:Object.assign({},labelArrangeArr[index].styleObj,{
            top: unit.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: unit.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          }),
          isCenter: false
        };
      });

      // 布局左右两侧的图片
      for (var i = 0, j = labelArrangeArr.length, k = j / 2; i < j; i++) {
        var hPosRangeLORX = null;

        // 前半部分布局左边， 右半部分布局右边
        if (i < k) {
          hPosRangeLORX = hPosRangeLeftSecX;
        } else {
          hPosRangeLORX = hPosRangeRightSecX;
        }

        labelArrangeArr[i] = {
          styleObj:Object.assign({},labelArrangeArr[i].styleObj,{
            top: unit.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: unit.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          }),
          isCenter: false
        };
      }

      if (labelArrangeTopArr && labelArrangeTopArr[0]) {
        labelArrangeArr.splice(topLabelSpliceIndex, 0, labelArrangeTopArr[0]);
      }

      labelArrangeArr.splice(centerIndex, 0, labelArrangeCenterArr[0]);
      console.log(labelArrangeArr);
      this.setState({
        labelArrangeArr: labelArrangeArr
      });

  }
  /*
  *  组件加载完成 初始化 每一个标签的位置
  * */
  componentDidMount(){
    setTimeout(() => {
      let stageDom = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);

      // 拿到 标签的大小
      let labelDom = ReactDOM.findDOMNode(this.refs.label0),
          labelW = labelDom.scrollWidth,
          labelH = labelDom.scrollHeight,
          halfLabelW = Math.ceil(labelW/2),
          halfLabelH = Math.ceil(labelH/2);

       // 计算中心图的位置点
      Constant.centerPos = {
        top:halfStageH - halfLabelH,
        left:halfStageW - halfLabelW
      };

      // 计算左侧 右侧区域 标签的位置的取值范围

      Constant.hPosRange.leftSecX[0] = halfLabelW;
      Constant.hPosRange.leftSecX[1] = halfStageW - halfLabelW ;
      Constant.hPosRange.rightSecX[0] = halfStageW + halfLabelW;
      Constant.hPosRange.rightSecX[1] = stageW - halfLabelW;
      Constant.hPosRange.y[0] = halfLabelH;
      Constant.hPosRange.y[1] = stageH - halfLabelH;

      //计算上侧区域标签的位置的取值范围
      Constant.vPosRange.topY[0] = halfLabelH;
      Constant.vPosRange.topY[1] = halfStageH - halfLabelH;
      Constant.vPosRange.x[0] = halfStageW - labelW;
      Constant.vPosRange.x[1] = halfStageW;

      this.rearrange(0);
    },1000);

  }
}

export default cloudText;
