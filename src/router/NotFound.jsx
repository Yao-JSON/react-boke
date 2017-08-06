import React from 'react';
import './NotFound.less';
import NotFound from '../components/oterts/404';
export default class extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <NotFound history={this.props.history} className='empty-data'/>
      </div>
    );
  }
}
