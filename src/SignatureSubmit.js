import React, { Component }   from 'react';
import TextField              from '@material-ui/core/TextField';
import { withStyles }         from '@material-ui/core/styles';
import PropTypes              from 'prop-types';

import PokethClassSnackbar    from './PokethClassSnackbar.js';

const styles = theme => ({
  input: {
    fontSize: 12, 
  },
});

class SignatureSubmit extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      <div className={"input-group input-group-sm mono"}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">Hex Signature</span>
        </div>
        <TextField
          type="text"
          name="signature"
          className={"form-control"}
          placeholder={"ef68d9d38ce151f13a6c8fad101b4d300e5e93155b4026378449ab455f2f9c4c127b21cf1ebdbf72e5cb49bc115f49003270e88358bf65f4c79b416af76f57311b"}
          aria-label="Signature"
          InputProps={{classes}}
          aria-describedby="basic-addon1"
          onChange={this.props.handleChangeSignature}
          />
        <div className="input-group-append">
          <button
            className="btn btn-dark"
            type="button"
            id="button-addon2"
            onClick={this.props.handleClick}
            >
            Submit
          </button>
        </div>
        <PokethClassSnackbar
          open={this.props.open}
          handleSignature={this.props.handleSignature}
          handleClose={this.props.handleClose}
          pokethClass={this.props.pokethClass}
          coinbase={this.props.coinbase}
          />
      </div>
    );
  }
}

SignatureSubmit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignatureSubmit);