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
          placeholder="F7Dc813B5c746F777DD29c94b7558ADE7577064e"
          aria-label="ETH Address"
          aria-describedby="basic-addon1"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default LoadBalanceSubmit;