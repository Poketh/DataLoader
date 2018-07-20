import React, { Component } from 'react';
import Web3                 from 'web3';


import MatrixDescriptor     from './MatrixDescriptor.js';
import './App.css';

import logo                 from './poketh-logo-border.png';
import abi                  from './ERC891.json';

import Grid                 from '@material-ui/core/Grid';
import Navbar               from './Navbar.js';
import SignatureSubmit      from './SignatureSubmit.js';
import LoadBalanceSubmit    from './LoadBalanceSubmit.js';
import DataDisplay          from './DataDisplay.js';

const itemList      = Array(151).fill().map((x,i) => i+1);

const pokethAddress = '0x73019afe1da4bbe491b24fe6095ab8f1cd8bd05a';

const styles = {
  "white":              "#EAEAEA",
  "lightBlue":          "#00A8E8",
  "lightBlueAlt":       "#00E8FF",
  "midBlue":            "#007EA7",
  "darkBlue":           "#687887",
  "bgBlue":             "#43575D",
  "bg":                 "#181A1C",
  "bgAlt":              "#1D1F21",
}


class App extends Component {
  constructor(props){
    super(props);

    this.state = { display: null, balances: [], displayBalance: '0', addressLookup: '0x0' }

    this.showDetail     = this.showDetail.bind(this);
    this.loadBalanceFor = this.loadBalanceFor.bind(this);
    this.startTransfer  = this.startTransfer.bind(this);
    this.checkFind      = this.checkFind.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    
    this.web3           = new Web3(Web3.givenProvider || 'https://kovan.infura.io/metamask');
    this.pokethContract = new this.web3.eth.Contract(abi,pokethAddress);

  }

  componentDidMount() {
    this.web3.eth.getAccounts((e,a) => {
      const coinbase = a.length === 0 ? 'no address' : a[0];
      this.loadBalanceFor(coinbase);
      this.setState({coinbase: coinbase})
    });
  }

  handleChange(e) {
    this.loadBalanceFor(e.target.value);
  }

  loadBalanceFor(address) {
    console.log(address)
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())){
      this.setState({hasError: true && address !== ''});
      address = this.web3.eth.accounts[0];
    } else {
      this.setState({hasError: false});
    }


    this.pokethContract.methods.balanceOf(address).call((err, ans) => {
      const balancesData = ans;
      this.setState({balances: balancesData})
    });
  }

  startTransfer(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())) address = this.web3.eth.accounts[0];


    this.pokethContract.transfer(address, this.state.num, {value:0, gas: 1000000}, (err, ans) => {
      console.log(ans,err)
    });
  }

  checkFind(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())) address = this.web3.eth.accounts[0];

    this.pokethContract.checkFind(address, (err, ans) => {
      console.log(ans,err)
    });
  }

  showDetail(id, name,c, xo, yo){
    const balancesData = this.state.balances ? this.state.balances[id] : "???";
    this.setState({display: c.toDataURL(), displayName: name, xoff: xo, yoff: yo, num: id, displayBalance: balancesData});
  }

  render() {
    const display       = this.state.num ? this.state.num + ". " + this.state.displayName : "";
    const white         = styles.white;
    const balance       = this.state.displayBalance;
    const coinbase      = this.state.coinbase;

    return (
      <div className="App">
        <Navbar
          logo={logo}
          web3={this.web3}
          contract={pokethAddress}
        />
        <Grid container className={'px-3 pt-3'} spacing={8}>
          <Grid item lg={5} xs={12} className={'stacked-min'}>
            <LoadBalanceSubmit 
              onChange={this.handleChange}  
              hasError={this.state.hasError}
              coinbase={this.state.coinbase}
              />
          </Grid>
          <Grid item lg={7} xs={12} className={'stacked-min'}>
            <SignatureSubmit />
          </Grid>

          <Grid item lg={5} xs={12} className={'poketh-display p-4 stacked-min'}>
            <DataDisplay
              logo={logo}
              display={display}
              displayImg={this.state.display}
              displayBalance={balance}
              white={white}
              />
          </Grid>
          <Grid item lg={7} xs={12} className={'p-4 mt-2 stacked-min'} style={{display: 'inline-block', textAlign: 'center'}}>
            { itemList.map((n) =>
                           <MatrixDescriptor
                             getChoice={this.showDetail}
                             key={n}
                             num={n}
                             caught={this.state.balances[n] > 0}
                             web3={this.web3}
                            />)
                           }
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default App;
