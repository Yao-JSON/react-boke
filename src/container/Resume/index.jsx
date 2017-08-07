import React from 'react'
import './index.less';
import { connect } from 'react-redux';
import HeaderNav from '../../components/Nav';
import CanvasBackground from '../../components/canvas/canvas-01';
import Title from '../../components/Resume/title';
import ResumeCore from '../../components/Resume/resume';
class Resume extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let clientWidth = this.props.Resize.clientWidth , clientHeight = this.props.Resize.clientHeight;
    let ScrollTop = this.props.ScrollTop.ScrollTop;
    return (<div className='resume-container '>
      <div className='margin-top-overflow' style={{height:clientHeight}}>
        <HeaderNav ScrollTop={ScrollTop} clientWidth={clientWidth} />
        {this.props.Resize.clientWidth > 768? <CanvasBackground
          MouseX = {this.props.MouseMove.MouseX || this.props.Resize.clientWidth/2}
          MouseY = {this.props.MouseMove.MouseY || this.props.Resize.clientHeight/2}
          clientWidth = {clientWidth}
          clientHeight = {clientHeight}/>:''}
        <Title clientWidth ={this.props.Resize.clientWidth}/>
        <ResumeCore clientWidth={clientWidth} clientHeight={clientHeight}/>
      </div>
    </div>);
  }
}
let mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps,null)(Resume);
