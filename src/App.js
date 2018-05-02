import React, { Component } from 'react';
import { Row, Col, Layout, Divider, Switch, Input, Tooltip } from 'antd';

import MatrixDescriptor from './MatrixDescriptor.js';
import './App.css';

import { getWallet } from './Miner.js';

import logo from './logo.png';
import abi from './ERC891.json';

const { Header, Footer, Content } = Layout;
const Search = Input.Search;

const itemList = Array(151).fill().map((x,i) => i+1);

const unitX = 100;
const unitY = 100;

const pokethAddress = '0xee473f5cd7e7a199a0ce1b2995a10ed0cdb9a8c1';
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

    this.state = {display: null, balances: [], displayBalance: '0', addressLookup: '0x0' }

    this.showDetail = this.showDetail.bind(this);
    this.loadBalanceFor = this.loadBalanceFor.bind(this);
  }

  componentDidMount() {
    window.web3.eth.getAccounts((e,a) => {
      this.loadBalanceFor(a[0]);
    });
  }

  loadBalanceFor(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())) address = window.web3.eth.accounts[0];

    var balances = window.web3.eth.contract(abi).at(pokethAddress);
    
    balances.balanceOf.call([address], (err, ans) => {
        const balancesData = ans.map((v) => v.c[0])
        this.setState({balances: balancesData})
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
            <Row type='flex' justify='space-between'>
              <Col span={1}><img style={{height:'50px', width:'auto'}} src={logo}/></Col>
              <Col span={10}><h4 style={{color:styles.blue}}>Loaded balances from {pokethAddress}.</h4></Col>
              <Col span={6}>
                <a href='#' style={{minWidth:'150px', padding:'10px', background: styles.orange, color: styles.blue}}>download miner</a>
              </Col>
              <Col span={3}><h3 style={{minWidth:'200px' ,textAlign:'right', color:styles.blue}}>{web3m}</h3></Col>
              <Col span={1}></Col>
            </Row>
          </Header>
          <Content style={{paddingTop:'32px', padding: '24px', background: styles.blue}}>
            <Row>
              <Col span={12}>
                <h1 style={{color: styles.white}}>Load balance from </h1>
                <Row>
                  <Col offset={1}>
                    <Search placeholder={'ETH Address'} onSearch={v => this.loadBalanceFor(v)} style={{width:'400px'}}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
          <Content style={{paddingTop:'32px', padding: '24px', background: styles.blue}}>
            <Row type='flex' gutter={16} justify='space-around'>
              <Col span={12} offset={0} style={{display: 'inline-block'}}>
                { itemList.map((n) => <MatrixDescriptor getChoice={this.showDetail} key={n} num={n} caught={this.state.balances[n] > 0}/>) }
              </Col>
              <Col span={12} offset={0} style={{display: 'inline-block'}}>
                <Content>
                  <Row type='flex' justify='center'>
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
          <Footer style={{background: styles.blue, textAlign: 'center'}}>
            <Divider style={{color: styles.red}}>
              <div style={{color: styles.white}}>Poketh Matrix Loader 2018</div>
            </Divider>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
