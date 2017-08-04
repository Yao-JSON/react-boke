import React from 'react'


export default class BokeView extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <h1>{ this.props.params.name }</h1>
      </div>
    );
  }
}






