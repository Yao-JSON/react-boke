import React from 'react';
import resumeBase from './page01/resume-base.json';
import classnames from 'classnames';
import './page01/page01.less';
import ResumeSkill from './page01/skill';
class ResumePage01 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      zIndex:1,
      deg:props.deg || 0
    }
  }
  render(){
    return(<div className={classnames(this.props.className,'resume-book-page01')} style={{transform:`rotateY(${this.state.deg}deg)`}}>
      <div className='front'>
        <div className='page-root'>
          <ResumeSkill />
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.prevPage(0)
          });
        }}>
          <span>Prev</span>
        </div>
      </div>
      <div className='back'>
        <div className='page-root'>
          <ul className='resume-base'>
            {
              resumeBase.map((value,index) => {
                if(value.link){
                  return (<li key={index.toString()}>
                    <div className='resume-icon-container'>
                      <i className={classnames('iconfont',value.icon)}></i>
                    </div>
                    <div className='resume-icon-content'>
                      <div className='resume-icon-content-label'>
                        <span>{value.label}</span>
                      </div>
                      <div className='resume-icon-content-text'>
                        <a href={value.link}>{value.text}</a>
                      </div>
                    </div>
                  </li>)
                }
                return (<li key={index.toString()}>
                  <div className='resume-icon-container'>
                    <i className={classnames('iconfont',value.icon)}></i>
                  </div>
                  <div className='resume-icon-content'>
                    <div className='resume-icon-content-label'>
                      <span>{value.label}</span>
                    </div>
                    <div className='resume-icon-content-text'>
                      <span>{value.text}</span>
                    </div>
                  </div>
                </li>)
              })
            }
          </ul>
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.nextPage(0)
          });
        }}>
          <span>next</span>
        </div>
      </div>
    </div>);
  }
  shouldComponentUpdate(nextProps,nextStates){
    return (this.state.deg !== nextStates.deg
      ||
      this.props.deg !== nextProps.deg);
  }
}

export default ResumePage01;
