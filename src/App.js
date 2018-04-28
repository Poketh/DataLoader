import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';

import MatrixDescriptor from './MatrixDescriptor.js';
import './App.css';
import logo from './logo.png';

const { Header, Content } = Layout;
const itemList = Array(151).fill().map((x,i) => i+1);

const unitX = 100;
const unitY = 100;

const abi = [{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[],"name":"MiningFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mine","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"name":"_diffMask","type":"uint256"}],"name":"setDifficulty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"inputs":[{"name":"_fee","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_add","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256[151]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"address"}],"name":"checkFind","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"miningFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"rewardItemMapping","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

class App extends Component {
  constructor(props){
    super(props);

    this.state = {display: null, balances: [], displayBalance: '0' }

    this.showDetail = this.showDetail.bind(this);
  }

  componentDidMount(){
    var balances = window.web3.eth.contract(abi).at('0xd2b0ace32d9958de3b6c437bb666532cc9e19cef');

    window.web3.eth.getAccounts((e,a) => {
      console.log(a)
      balances.balanceOf.call([a[0]], (err, ans) => {
        const balancesData = ans.map((v) => v.c[0])
        this.setState({balances: balancesData})
      });
    });
  }
  
  showDetail(id, name,c, xo, yo){
    const balancesData = this.state.balances ? this.state.balances[id] : "???";
    console.log(balancesData)
    this.setState({display: c.toDataURL(), displayName: name, xoff: xo, yoff: yo, num: id, displayBalance: balancesData});
  }

  render() {
    const display = this.state.num ? this.state.num + ". " + this.state.displayName : "";
    const web3m = window.web3 ? "web3 connected" : "No web3 connection";

    return (
      <div className="App">
        <Layout>
          <Header style={{background: '#257465'}}>
            <Row>
              <Col span={3}><img style={{height:'50px', width:'auto'}} src={logo}/></Col>
              <Col span={11} offset={10}><h3 style={{textAlign:'right', color:'#ADD5E1'}}>{web3m}</h3></Col>
            </Row>
          </Header>
          <Content style={{padding: '24px', background: '#202010'}}>
            <Row type='flex' gutter={16} justify='space-around'>
              <Col span={12} offset={0} style={{display: 'inline-block'}}>
                { itemList.map((n) => <MatrixDescriptor getChoice={this.showDetail} key={n} num={n}/>) }
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
                        <h1 style={{color:'#ADD5E1', textAlign:'center'}}>{display}</h1>
                        <div style={{color:'#ADD5E1', textAlign:'center'}}>
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
