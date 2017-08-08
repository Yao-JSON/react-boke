import React from 'react'

class ResumePage01 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      zIndex:1,
      deg:props.deg
    }
  }
  render(){
    return(<div className={this.props.className} style={{transform:`rotateY(${this.state.deg}deg)`}}>
      <div className='front'>
        <div className='page-root'>
          111front
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.prevPage(1)
          });
        }}>
          <span>Prev</span>
        </div>
      </div>
      <div className='back'>
        <div className='page-root'>
          111back
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.nextPage(1)
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
