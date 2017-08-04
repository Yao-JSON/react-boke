import React from 'react';
import Grid from 'uxcore-grid';
let { Row , Col } = Grid;
let assert = require('assert');
import LeftHomeNav from '../../components/Boke/left-home-nav';
import { Route , Link} from 'react-router';

// import Layout from 'uxcore-layout';
// let { Left , Right } = Layout;
// var Prism = require('prismjs');
//
// // The code snippet you want to highlight, as a string
// var code = "var data = 1;";
//
// // Returns a highlighted HTML string
// var html = Prism.highlight(code, Prism.languages.javascript);

export default class extends React.Component{
  constructor(props){
    super(props);
    var clientHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    var clientWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
    this.state={
      clientHeight,
      clientWidth
    }
  }
  render(){
    let clientWidth = document.body.offsetWidth || document.documentElement.offsetWidth;
    let height = clientWidth > 976 ? '100vh' : 'auto';
    return (
      <Grid fluid={true}>
        <Row>
          {/* 左边 */}
          <Col md={8} sm={24} xs={24}  style={{height:'100vh'}} className='padding-left-0'>
            <LeftHomeNav clientWidth={clientWidth}/>
          </Col>
          {/* 右边 */}
          <Col md={16} sm={24} xs={24} style={{height:height,overflowY:'auto',background:'#dd0'}} className='padding-right-0'>
            <div style={{height:'300vh'}}>
              {this.props.children}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
  componentDidMount(){

  }
  shouldComponentUpdate(nextProps,nextstate){
    try{
      assert.deepEqual(this.props,nextProps)
    }catch (er){

      return true
    }
    return false;
  }
}
