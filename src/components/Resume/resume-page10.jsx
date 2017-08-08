import React from 'react'

class ResumePage04 extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div className={this.props.className} style={{transform:`rotateY(${180}deg)`}}>
      <div className='front'>
        <div className='page-root'>
          010 front
        </div>
      </div>
      <div className='back'>
        <div className='page-root'>
          010 back
        </div>
      </div>
    </div>);
  }
  shouldComponentUpdate(){
    return false;
  }
}

export default ResumePage04;
