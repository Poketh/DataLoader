import React, { Component } from 'react';
import Tooltip              from '@material-ui/core/Tooltip';
import { withStyles }       from '@material-ui/core/styles';
import PropTypes            from 'prop-types';

const styles = theme => ({
  tooltipHelp: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
});

class Navbar extends React.Component {
  render() {
    const { classes } = this.props;


    const web3m       = this.props.web3 ? "web3 connected" : "No web3 connection";

    const status      = this.props.web3.utils.isAddress(this.props.coinbase) 
    ? <status-indicator positive pulse></status-indicator>
          : <status-indicator intermediary></status-indicator>;

    const statusMsg   = this.props.web3.utils.isAddress(this.props.coinbase)
    ? "Wallet Available"
          : "No Wallet Available";

    return(
      <nav className="sticky-top navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={this.props.logo} width="30" height="30" alt=""/>Poketh
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-auto mono">
              <a className="nav-link navbar-text-change"
                target="_blank"
                href={"https://etherscan.io/address/" + this.props.contract}
                >
                Contract: {this.props.contract}
              </a>
            </li>
          </ul>
          <span className="navbar-text navbar-text-change">
            <span className="mr-3">{web3m}</span>
            <Tooltip classes={{ tooltip: classes.tooltipHelp }} title={statusMsg}>
              <span className="mr-3">{status}</span>
            </Tooltip>
          </span>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);