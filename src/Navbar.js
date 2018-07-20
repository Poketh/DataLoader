import React, { Component } from 'react';

class Navbar extends React.Component {
  render() {
    return(
      <nav className="sticky-top navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img src={this.props.logo} width="30" height="30" alt=""/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <span className="navbar-text mr-auto">
            <span>Poketh</span>
          </span>
          <span className="navbar-text mono mr-auto">
            Contract: {this.props.contract}
          </span>
          <span className="navbar-text">
            {this.props.web3m}
          </span>
        </div>
      </nav>
    );
  }
}

export default Navbar;