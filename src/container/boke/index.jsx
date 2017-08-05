import React from 'react';
import Grid from 'uxcore-grid';
let { Row , Col } = Grid;
import LeftHomeNav from '../../components/Boke/left-home-nav';
import { connect } from 'react-redux';
import './index.less';
import assert from 'assert';
import Layout from 'uxcore-layout';
let { Left , Right } = Layout;

class PCLayout extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Layout className='boke-layout'>
        <Left width={400} className='boke-layout-left'>
          <LeftHomeNav clientWidth={this.props.clientWidth}/>
        </Left>
        <Right adaptive={true} className='boke-layout-right'>
          <div className='boke-view' style={{height:this.props.clientHeight}}>
            <div style={{height:'300vh'}}>
              {this.props.children}
            </div>
          </div>
        </Right>
      </Layout>
    )
  }
  shouldComponentUpdate(nextProps){
      try{
        assert.deepEqual(this.props,nextProps)
      }catch (e){
        return true;
      }
    return false
  }
}

class YDLayout extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Grid fluid={true}>
        <Row>
          <Col xs={24} sm={24} className='boke-nav-padding-notthing'>
            <LeftHomeNav ScrollTop={this.props.ScrollTop} clientWidth={this.props.clientWidth}/>
          </Col>
          <Col xs={24} sm={24}>
            <div className='boke-view' style={{height:this.props.clientHeight}}>
              <div style={{height:'300vh'}}>
                {this.props.children}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
  shouldComponentUpdate(nextProps){
    try{
      assert.deepEqual(this.props,nextProps)
    }catch (e){
      return true;
    }
    return false
  }
}

class Boke extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let clientWidth = document.documentElement.clientWidth || document.body.clientWidth ;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight ;
    let ScrollTop = this.props.ScrollTop.ScrollTop;
    return (
      clientWidth > 768?
      <PCLayout clientWidth={clientWidth} clientHeight={clientHeight}>{this.props.children}</PCLayout>
      : <YDLayout ScrollTop={ScrollTop} clientWidth={clientWidth} clientHeight={clientHeight}>{this.props.children}</YDLayout>
    );
  }
  shouldComponentUpdate(nextProps){
    return(
      this.props.Resize.clientWidth !== nextProps.clientWidth
      ||
      this.props.Resize.clientHeight !== nextProps.clientHeight
      ||
      this.props.ScrollTop.ScrollTop !== nextProps.ScrollTop)
  }
}
let mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps,null)(Boke);
