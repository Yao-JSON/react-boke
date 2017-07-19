require('normalize.css/normalize.css');
require('styles/App.less');
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      	<div className="index">
       		<h1 style={{textAlign:"center",marginTop:"150px",color:"#fff"}}>hello world</h1>
      	</div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
