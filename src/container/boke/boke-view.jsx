import React from 'react'
import ProjrctSource from '../../sources/blog/project';
import HomeProject from '../../components/Boke/home-projrct';
import Grid from 'uxcore-grid';
import NotFound from '../../components/oterts/404';
class ProjectForMe extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<Grid fluid={true}>
      {ProjrctSource.map((value,index) => {
        return(<HomeProject key={index} {...value}/>);
      })}
    </Grid>);
  }
}



export default class BokeView extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let name = this.props.params.name;
    switch (name){
      case 'project':
        return(<ProjectForMe/>);
      default:
        return (<NotFound history={this.props.history}/>);
    }
  }

  shouldComponentUpdate(nextProps){
      return (this.props.params.name !== nextProps.params.name)
  }
}






