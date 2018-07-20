import React, { Component } from 'react';

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
  }

  componentDidMount() {
    window.web3.eth.getAccounts((e,a) => {
      this.loadBalanceFor(a[0]);
    });
  }

  handleChange(e) {
    console.log(e.target.value)
    this.loadBalanceFor(e.target.value);
  }

  loadBalanceFor(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())){
      address = window.web3.eth.accounts[0];
      this.setState({hasError: true});
    } else {
      this.setState({hasError: false});
    }

    let balances = window.web3.eth.contract(abi).at(pokethAddress);

    balances.balanceOf.call([address], (err, ans) => {
      const balancesData = ans.map((v) => v.c[0])
      this.setState({balances: balancesData})
    });
  }

  startTransfer(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())) address = window.web3.eth.accounts[0];

    let pkth = window.web3.eth.contract(abi).at(pokethAddress);

    pkth.transfer(address, this.state.num, {value:0, gas: 1000000}, (err, ans) => {
      console.log(ans,err)
    });
  }

  checkFind(address) {
    if(!/0x[a-f0-9]{40}/.test(address.toLowerCase())) address = window.web3.eth.accounts[0];

    let pkth = window.web3.eth.contract(abi).at(pokethAddress);

    pkth.checkFind(address, (err, ans) => {
      console.log(ans,err)
    });
  }

  showDetail(id, name,c, xo, yo){
    const balancesData = this.state.balances ? this.state.balances[id] : "???";
    this.setState({display: c.toDataURL(), displayName: name, xoff: xo, yoff: yo, num: id, displayBalance: balancesData});
  }

  render() {
    const display       = this.state.num ? this.state.num + ". " + this.state.displayName : "";
    const web3m         = window.web3 ? "web3 connected" : "No web3 connection";
    const white         = styles.white;
    const balance       = this.state.displayBalance;

    return (
      <div className="App">
        <Navbar logo={logo} web3m={web3m}/>
        <Grid container className={'px-3 pt-3'} spacing={8}>
          <Grid item sm={5}>
            <LoadBalanceSubmit
              onChange={this.handleChange}  
              hasError={this.state.hasError}
              />
          </Grid>
          <Grid item sm={7}>
            <SignatureSubmit />
          </Grid>

          <Grid item sm={5} className={'poketh-display p-5'}>
            <DataDisplay
              logo={logo}
              display={display}
              displayImg={this.state.display}
              displayBalance={balance}
              white={white}
              />
          </Grid>
          <Grid item sm={7} style={{display: 'inline-block'}}>
            { itemList.map((n) =>
                           <MatrixDescriptor
                             getChoice={this.showDetail}
                             key={n}
                             num={n}
                             caught={this.state.balances[n] > 0}
                             />)
                           }
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default App;
