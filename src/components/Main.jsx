require('normalize.css/normalize.css');
//require('styles/App.less');
import React from 'react';
let Grid = require('uxcore-grid');
let classnames = require('classnames');
let {Row, Col} = Grid;
require('./main.less');
class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
              <Grid fluid={true}>
                  <Row className="show-grid">
                      <Col xs={24} md={16}><code>&lt;{'Col xs={24} md={16}'} /&gt;</code></Col>
                      <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                  </Row>

                  <Row className="show-grid">
                      <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                      <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                      <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                  </Row>

                  <Row className="show-grid">
                       <Col xs={12} xsOffset={12}><code>&lt;{'Col xs={12} xsOffset={12}'} /&gt;</code></Col>
                  </Row>

                  <Row className="show-grid">
                      <Col md={12} mdPush={12}><code>&lt;{'Col md={12} mdPush={12}'} /&gt;</code></Col>
                      <Col md={12} mdPull={12}><code>&lt;{'Col md={12} mdPull={12}'} /&gt;</code></Col>
                  </Row>
              </Grid>
            </div>
        );
    }
};

// AppComponent.defaultProps = {
// 	hello:'hello world',
// 	title:'你好，世界！'
// };

export default AppComponent;
