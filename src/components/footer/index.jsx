import React from 'react'
import alipayImg from '../../images/alipay.jpeg';
import  weixinImg from '../../images/weixin.jpeg';
require('./index.less');
import classnames from 'classnames';
import Grid from 'uxcore-grid';
let { Row , Col } = Grid;
let Year;
export default class extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alipay:true,
      year:new Date().getFullYear()
    }
  }
  toogleAlipay(){
    this.setState({
      alipay:!this.state.alipay
    });
  }
  render(){
    return(
      <Grid fluid={true} className='footer'>
        <Row>
          <Col mdOffset={4} md={16} xsOffset={2} xs={20} sm={20} smOffset={2} >
            <Row>
              <div className='pay-container'>
                <p>
                  如果您觉得我的博客对您有用，请随意打赏。<br/>
                  您的支持将鼓励我继续创作！
                </p>
                <div className='btn-container'>
                  <button className={classnames({'hover':this.state.alipay})} onClick={() => {
                    this.toogleAlipay()
                  }}>¥支付宝支持</button>
                  <button className={classnames({'hover':!this.state.alipay})} onClick={() => {
                    this.toogleAlipay()
                  }}>¥微信支持</button>
                </div>
                <div className='img-container'>
                  <img src={this.state.alipay?alipayImg:weixinImg}/>
                </div>
              </div>
            </Row>
            <Row>
              <div className='mark'>
                <p>
                  如果您对对我的工作经历感兴趣欢迎查看
                  <a href="#">YJSON个人简历</a>
                </p>
                <p>
                  Copyright © YJSON {this.state.year}
                </p>
              </div>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
  shouldComponentUpdate(nextProps,nextState){
      return (
        this.props.clientHeight !== nextProps.clientHeight
        ||
        this.props.clientWidth !== nextProps.clientWidth
        ||
        this.state.alipay !== nextState.alipay
      );
  }
}
