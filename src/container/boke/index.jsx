import React from 'react';
import Grid from 'uxcore-grid';
let { Row , Col } = Grid;
import Layout from 'uxcore-layout';
let { Left , Right } = Layout;


export default class extends React.Component{
  componentWillMount(){

  }
  render(){
    return (
      <Grid fluid={true}>
        <Row>
          {/* 左边 */}
          <Col md={8} sm={24} xs={24}>

          </Col>
          {/* 右边 */}
          <Col md={16} sm={24} xs={24}>
            <pre>
                <code class="lang-javascript">

                </code>
            </pre>
          </Col>
        </Row>
      </Grid>
    );
  }
  componentDidMount(){

  }
}
