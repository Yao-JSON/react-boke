import React from 'react'
import EmptyData from 'uxcore-empty-data';
import Button from 'uxcore-button';

class NotFound extends React.Component{
  constructor(props){
    super(props);
  }
  goBack(){
    this.props.history.goBack();
  }
  render(){
    return (<EmptyData {...this.props} type="large">
      <h1 style={{fontSize:'4rem'}}>404</h1>
      <div>敬请期待。。。</div>
      <Button type="outline" style={{ marginTop: '10px' }} onClick={this.goBack.bind(this)}>返回</Button>
    </EmptyData>);
  }
}
NotFound.PropTypes = {
  history:React.PropTypes.object
}


export default NotFound;
