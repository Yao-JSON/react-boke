import React from 'react'
import classnames from 'classnames';
import ResumeBookRoot from './resume-book-root';
import './resume.less';


class Resume extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ImgNode:null
    }
  }
  imgageLoad(){
    this.setState({
      ImgNode:this.refs.ResumeBookBackgroundImage
    });
  }
  render(){
    let clientWidth = this.props.clientWidth;
    let clientHeight = this.props.clientHeight;
    let w,h ,divH,styleBookRoot;
    if(clientWidth > 768){
      divH = clientHeight - 195;
      styleBookRoot={
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundSize:`${w}px ${h}px`
      }
    }else{
      divH = clientHeight -60;
      styleBookRoot = {
        width:clientHeight-60,
        height:clientWidth,
        padding: '0 5% 0 0',
        right:-(clientHeight - clientWidth-60)/2
      }
    }
    let styleResume = {
      width:clientWidth,
      height:divH
    };
    return(<div style={styleResume} className={classnames('Resume-component-resume',{'Resume-component-resume-top':clientWidth <= 768})}>
      <div className={classnames('resume-book-container',{'resume-book-container-transform':clientWidth <= 768})} style={styleBookRoot}>
        <img onLoad={this.imgageLoad.bind(this)}  ref='ResumeBookBackgroundImage'  src="../../images/resume-book.png" />
        <ResumeBookRoot clientWidth={clientWidth} ImgNode={this.state.ImgNode} />
      </div>
    </div>);
  }
  shouldComponentUpdate(nextProps,nextStates){
    return (this.props.clientWidth !== nextProps.clientWidth
      ||
      this.props.clientHeight !== nextProps.clientHeight
      ||
      this.state.ImgNode !== nextStates.ImgNode);
  }
}
Resume.PropTypes = {
  clientWidth:React.PropTypes.number,
  clientHeight:React.PropTypes.number
};
export default Resume;

