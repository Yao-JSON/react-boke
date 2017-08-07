import React from 'react'
import classnames from 'classnames';
import './resume.less';


class Resume extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let clientWidth = this.props.clientWidth;
    let clientHeight = this.props.clientHeight;
    let w,h ,divH,styleBookRoot;
    if(clientWidth > 768){
      divH = clientHeight - 195;
      w = clientWidth;
      h = w * 6/9 > divH ? divH :  (w * 6/9 );
      styleBookRoot={
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundSize:`${w}px ${h}px`
      }
    }else{
      divH = clientHeight -60;
      w = clientHeight-100;
      h = w*6/9;
      styleBookRoot = {
        backgroundSize:`${w}px ${h}px`,
        width:divH,
        height:clientWidth -20,
        left:clientWidth - 20,
        top:5
      }
    }
    let styleResume = {
      width:clientWidth,
      height:divH
    };
    return(<div style={styleResume} className={classnames('Resume-component-resume',{'Resume-component-resume-top':clientWidth <= 768})}>
      <div className={classnames('Resume-book-root',{'Resume-book-root-transform':clientWidth <= 768})} style={styleBookRoot}>

      </div>
    </div>);
  }
  shouldComponentUpdate(nextProps){
    return (this.props.clientWidth !== nextProps.clientWidth
      ||
    this.props.clientHeight !== nextProps.clientHeight);
  }
}
Resume.PropTypes = {
  clientWidth:React.PropTypes.number,
  clientHeight:React.PropTypes.number
};
export default Resume;

