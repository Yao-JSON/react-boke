import React from 'react'
import classnames from 'classnames';
import YJSONME from '../../images/YJSON-me.jpeg';
class ResumePage00 extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div className={classnames(this.props.className,'resume-book-page00')}>
      <div className='front'>
        <div className='page-root'>
          <div className='book-page01-image-container'>
            <img className='img-responsive' src={YJSONME} alt=""/>
          </div>
          <div className='YJSON-init'>
            <h1>姚嘉松</h1>
            <p>WEB前端工程师</p>
            <p><a href="mailto:YJSON921305@gmail.com">YJSON921305@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>);
  }
  shouldComponentUpdate(){
    return false;
  }
}

export default ResumePage00;
