import React from 'react'

class ResumePage09 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      deg:props.deg
    }
  }
  render(){
    return(<div className={this.props.className} style={{transform:`rotateY(${this.state.deg}deg)`}}>
      <div className='front'>
        <div className='page-root'>
            999 front
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.prevPage(9)
          });
        }}>
          <span>Prev</span>
        </div>
      </div>
      <div className='back'>
        <div className='page-root'>
          999 back
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.nextPage(9)
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

export default ResumePage09;
