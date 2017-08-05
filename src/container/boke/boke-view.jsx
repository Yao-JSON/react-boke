import React from 'react'


export default class BokeView extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(next){

  }
  render(){
    return (
      <div>
        <h1>{ this.props.params.name }</h1>
      </div>
    );
  }

  shouldComponentUpdate(nextProps){
      return (this.props.params.name !== nextProps.params.name)
  }
}






