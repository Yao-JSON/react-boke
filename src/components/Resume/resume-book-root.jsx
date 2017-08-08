import React from 'react'
import './resume-book-root.less';
import ResumePage00 from './resume-page00';
import ResumePage01 from './resume-page01';
import ResumePage02 from './resume-page02';
import ResumePage03 from './resume-page03';
import ResumePage04 from './resume-page04';
import ResumePage05 from './resume-page05';
import ResumePage06 from './resume-page06';
import ResumePage07 from './resume-page07';
import ResumePage08 from './resume-page08';
import ResumePage09 from './resume-page09';
import ResumePage10 from './resume-page10';

const errorDeg = 0.4;
const toatlPages = 11;
class ResumeBookRoot extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentPage:0
    };
  }
  prevPage(page){
    page = page || 0;
    let deg = 180 - (toatlPages - page) * errorDeg;
    return deg;
  }
  nextPage(page){
    page = page || 0;
    let deg = page * errorDeg;
    return deg;
  }
  render(){
    let ImgNode = this.props.ImgNode;
    let width = 0,height=0,offsetTop,offsetLeft;
    let styleBookRoot = {};
    if(ImgNode){
      width = ImgNode.width;
      height = ImgNode.height;
      offsetTop = ImgNode.offsetTop;
      offsetLeft = ImgNode.offsetLeft;
      styleBookRoot={
        top:offsetTop + 13,
        height:height - 26,
        width:width-65,
        left:offsetLeft+32
      }
    }
    return (<div className='resume-book-root' style={styleBookRoot}>
      <ResumePage00 className='resume-book-page'/>
      <ResumePage01 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(1)} />
      <ResumePage02 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(2)} />
      <ResumePage03 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(3)} />
      <ResumePage04 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(4)} />
      <ResumePage05 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(5)} />
      <ResumePage06 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(6)} />
      <ResumePage07 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(7)} />
      <ResumePage08 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(8)} />
      <ResumePage09 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage} deg={this.prevPage(9)} />
      <ResumePage10 className='resume-book-page' prevPage={this.prevPage} nextPage={this.nextPage}/>
    </div>);
  }
  shouldComponentUpdate(nextProps){
    return(this.props.ImgNode !== nextProps.ImgNode
    ||
    this.props.clientWidth !== nextProps.clientWidth);
  }
}

export default ResumeBookRoot;





