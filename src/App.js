import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';

import MatrixDescriptor from './MatrixDescriptor.js';
import './App.css';

import logo from './logo.png';
import abi from './ERC891.json';

const { Header, Content } = Layout;
const itemList = Array(151).fill().map((x,i) => i+1);

const unitX = 100;
const unitY = 100;

const styles = {
  'blue': '#003049',
  'red': '#D62828',
  'orange': '#F77F00',
  'yellow': '#FCBF49',
  'white': '#EAE2B7'
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {display: null, balances: [], displayBalance: '0' }

    this.showDetail = this.showDetail.bind(this);
  }

  componentDidMount(){
    var balances = window.web3.eth.contract(abi).at('0xee473f5cd7e7a199a0ce1b2995a10ed0cdb9a8c1');

    window.web3.eth.getAccounts((e,a) => {
      balances.balanceOf.call([a[0]], (err, ans) => {
        const balancesData = ans.map((v) => v.c[0])
        this.setState({balances: balancesData})
      });
    });
  }
  
  showDetail(id, name,c, xo, yo){
    const balancesData = this.state.balances ? this.state.balances[id] : "???";
    this.setState({display: c.toDataURL(), displayName: name, xoff: xo, yoff: yo, num: id, displayBalance: balancesData});
  }

  render() {
    const display = this.state.num ? this.state.num + ". " + this.state.displayName : "";
    const web3m = window.web3 ? "web3 connected" : "No web3 connection";

    return (
      <div className="App">
        <Layout>
          <Header style={{background: styles.white}}>
            <Row>
              <Col span={3}><img style={{height:'50px', width:'auto'}} src={logo}/></Col>
              <Col span={11} offset={10}><h3 style={{textAlign:'right', color:styles.blue}}>{web3m}</h3></Col>
            </Row>
          </Header>
          <Content style={{padding: '24px', background: styles.blue}}>
            <Row type='flex' gutter={16} justify='space-around'>
              <Col span={12} offset={0} style={{display: 'inline-block'}}>
                { itemList.map((n) => <MatrixDescriptor getChoice={this.showDetail} key={n} num={n} caught={this.state.balances[n] > 0}/>) }
              </Col>
              <Col span={12} offset={0} style={{display: 'inline-block'}}>
                <Content>
                  <Row justify='center'>
                    <Col span={24}>
                      <div style={{height:'500px', width:'500px', textAlign:'center'}}>
                        <img style={{marginLeft: this.state.xoff*unitX, marginTop: this.state.yoff*unitY}} className="dataDisplay" src={this.state.display}/>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div style={{width:'500px', padding:'24px'}}>
                        <h1 style={{color: styles.white, textAlign:'center'}}>{display}</h1>
                        <div style={{color: styles.white, textAlign:'center'}}>
                          <img style={{width:'30px', height:'auto'}} src={logo}/> x  {this.state.displayBalance}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Content>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
