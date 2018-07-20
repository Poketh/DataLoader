import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


class LoadBalanceSubmit extends React.Component {
  render() {
    return(
      <div className="input-group input-group-sm mono">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">Hex Address</span>
        </div>
        <TextField
          type="text"
          name="address"
          error={this.props.hasError}
          className="form-control"
          placeholder={this.props.coinbase}
          aria-label="ETH Address"
          aria-describedby="basic-addon1"
          onChange={this.props.onChange}
        />
        <div className="input-group-append">
          <button className="btn btn-dark" type="button" id="button-addon2">Load</button>
        </div>
      </div>
    );
  }
}

export default LoadBalanceSubmit;