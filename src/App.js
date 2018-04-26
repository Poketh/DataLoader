import React, { Component } from 'react';
import { Row, Col, Layout, Card } from 'antd';

import MatrixDescriptor from './MatrixDescriptor.js';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;
const itemList = Array(151).fill().map((x,i) => i+1);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header style={{background: 'white'}}>
          <h1 style={{color: 'black'}}>PokETH</h1>
        </Header>
        <Layout>
          <Content style={{background: '#040403'}}>
            <Row>
              <Col span={8} offset={2} style={{display: 'inline-block'}}>
                  { itemList.map((n) => <MatrixDescriptor key={n} num={n}/>) }
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
