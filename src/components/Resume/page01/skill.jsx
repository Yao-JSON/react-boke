import React from 'react'
import CloudText from './cloud-text';
//import cloudHtml from './cloud.html';
class Skill extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div className='resume-page01-front'>
      <div className='resume-page01-front-title'>技术栈</div>
      <CloudText/>
    </div>);
  }
}

export default Skill;
