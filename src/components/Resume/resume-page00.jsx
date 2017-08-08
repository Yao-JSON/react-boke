import React from 'react'

class ResumePage00 extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div className={this.props.className}>
      <div className='front'>
        <div className='page-root'>
          0000 front
        </div>
      </div>
    </div>);
  }
  shouldComponentUpdate(){
    return false;
  }
}

export default ResumePage00;
