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

// ###############################################################

const itemList      = Array(151).fill().map((x,i) => i+1);

const pokethAddress = '0x0d72af832e37a284c8d8eac0c82c92f872441f20';

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

    this.state = { display: null, balances: [], displayBalance: '0', addressLookup: '0x0', open: false, coinbase: 'no address', }

    this.showDetail             = this.showDetail.bind(this);
    this.startTransfer          = this.startTransfer.bind(this);
    this.loadBalanceFor         = this.loadBalanceFor.bind(this);

    this.handleChange           = this.handleChange.bind(this);
    this.handleSignature        = this.handleSignature.bind(this);
    this.handleChangeSignature  = this.handleChangeSignature.bind(this);

    this.handleCloseSnackbar    = this.handleCloseSnackbar.bind(this);
    this.handleClickSnackbar    = this.handleClickSnackbar.bind(this);

    this.web3                   = new Web3(Web3.givenProvider || 'https://kovan.infura.io/metamask');
    this.pokethContract         = new this.web3.eth.Contract(abi,pokethAddress);

  }

  componentDidMount() {
    this.web3.eth.getAccounts((e,a) => {
      const coinbase = a.length === 0 ? 'no address' : a[0];
      this.loadBalanceFor(coinbase);
      this.setState({coinbase: coinbase})
    });
  }

  handleClickSnackbar() {
    this.setState({ open: true });
  };

  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChange(e) {
    this.loadBalanceFor(e.target.value);
  }

  handleChangeSignature(e) {
    const signature = e.target.value;
    const message   = this.web3.utils.soliditySha3({t:'bytes20',v:this.state.coinbase});

    if((/^0x[0-9a-fA-F]{130}/).test(signature)) {
      this.setState({ signature: signature });
      this.web3.eth.personal.ecRecover(message, signature).then(a => {
        this.pokethContract.methods.checkFind(a).call((err,ans) => {
          this.setState({ pokethClass: ans });
        });
      })
    }
  }

  handleSignature(e) {
    this.handleCloseSnackbar();

    if(this.web3.utils.isAddress(this.state.coinbase)){
      this.pokethContract.methods.claimWithSignature(this.state.signature).send({ from: this.state.coinbase, gasPrice: 5000000000 })
        .on('confirmation', () => {
        this.loadBalanceFor(this.state.coinbase);  
      });
    }
  }

  loadBalanceFor(address) {
    if(!this.web3.utils.isAddress(address)){
      this.setState({hasError: true && address !== ''});
      address = this.state.coinbase;
    } else {
      this.setState({hasError: false});
      address = this.web3.utils.toChecksumAddress(address);
    }

    if(address !== 'no address') {
      this.pokethContract.methods.balanceOf(address).call((err, ans) => {
        const balancesData = ans;
        this.setState({balances: balancesData})
      });
    }
  }

  startTransfer(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())) address = this.web3.eth.accounts[0];


    this.pokethContract.transfer(address, this.state.num, {value:0, gas: 1000000}, (err, ans) => {
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
          coinbase={this.state.coinbase}
          />
        <Grid container className={'px-3 pt-3'} spacing={8}>
          <Grid item sm={5} xs={12} className={'stacked-min'}>
            <LoadBalanceSubmit 
              onChange={this.handleChange}  
              hasError={this.state.hasError}
              coinbase={this.state.coinbase}
              />
          </Grid>
          <Grid item sm={7} xs={12} className={'stacked-min'}>
            <SignatureSubmit
              handleChangeSignature={this.handleChangeSignature}
              handleSignature={this.handleSignature}  
              handleClick={this.handleClickSnackbar}
              handleClose={this.handleCloseSnackbar}
              open={this.state.open}
              pokethClass={this.state.pokethClass}
              coinbase={this.state.coinbase}
              />
          </Grid>

          <Grid item sm={5} xs={12} className={'poketh-display p-4 stacked-min'}>
            <DataDisplay
              logo={logo}
              display={display}
              displayImg={this.state.display}
              displayBalance={balance}
              white={white}
              />
          </Grid>
          <Grid item sm={7} xs={12} className={'p-4 mt-2 stacked-min'} style={{display: 'inline-block', textAlign: 'center'}}>
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
