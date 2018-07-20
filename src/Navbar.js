import React, { Component } from 'react';

class Navbar extends React.Component {
  render() {
    return(
      <nav className="sticky-top navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={this.props.logo} width="30" height="30" alt=""/> Poketh
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item mr-auto mono">
              <a class="nav-link navbar-text-change"
                target="_blank"
                href={"https://etherscan.io/address/" + this.props.contract}
              >
                Contract: {this.props.contract}
              </a>
            </li>
          </ul>
          <span className="navbar-text navbar-text-change">
            {this.props.web3m}
          </span>
        </div>
      </nav>
    );
  }
}

export default Navbar;