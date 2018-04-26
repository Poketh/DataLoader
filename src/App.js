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
          <Content style={{background: 'rgb(0, 0, 0)'}}>
            <Row type="flex" justify="start" align="middle">
              { itemList.map((n) => <MatrixDescriptor key={n} num={n}/>) }
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
