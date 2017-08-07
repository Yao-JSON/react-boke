import React from 'react'
import './title.less';
class ResumeTitle extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let clientWidth = this.props.clientWidth;
    if(clientWidth > 768){
      return (<div className='Resume-component-title'>
        <span>RESUME</span>
      </div>);
    }
    return (<div></div>);
  }
  shouldComponentUpdate(nextProps){
    return (this.props.clientWidth !== nextProps.clientWidth);
  }
}
ResumeTitle.PropTypes ={
  clientWidth:React.PropTypes.number
};
export default ResumeTitle;




