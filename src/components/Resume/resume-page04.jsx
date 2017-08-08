import React from 'react'

class ResumePage04 extends React.Component{
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
            444 front
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.prevPage(4)
          });
        }}>
          <span>Prev</span>
        </div>
      </div>
      <div className='back'>
        <div className='page-root'>
          444 back
        </div>
        <div className='page-contral' onClick={() => {
          this.setState({
            deg:this.props.nextPage(4)
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

export default ResumePage04;
