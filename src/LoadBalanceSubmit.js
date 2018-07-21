import React, { Component } from 'react';
import TextField            from '@material-ui/core/TextField';
import Tooltip              from '@material-ui/core/Tooltip';
import { withStyles }       from '@material-ui/core/styles';
import PropTypes            from 'prop-types';
import IconButton           from '@material-ui/core/IconButton';
import Icon                 from '@material-ui/core/Icon';
import CloseIcon            from '@material-ui/icons/Close';

const styles = theme => ({
  tooltipHelp: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
  icon: {
    color: "#FFFFFF",
  },
  input: {
    fontFamily: 'Roboto Mono',
  }
});

class LoadBalanceSubmit extends React.Component {
  render() {
    const { classes } = this.props;
    const status      = this.props.hasError ? "danger" : "success";
    const statusMsg   = this.props.hasError ? "Invalid address (Loading coinbase)" : "Valid address";
    const icon        = this.props.hasError ? <Icon className={classes.icon}>error</Icon> : <Icon className={classes.icon}>check_circle</Icon>;

    return(
      <div className="input-group input-group-sm mono">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">Hex Address</span>
        </div>
        <TextField
          type="text"
          id="textField1"
          name="address"
          className="form-control"
          InputProps={{
            className: classes.input
          }}
          placeholder={this.props.coinbase}
          aria-label="ETH Address"
          aria-describedby="basic-addon1"
          onChange={this.props.onChange}
          />
        <div className="input-group-append">
          <Tooltip classes={{ tooltip: classes.tooltipHelp }} title={statusMsg}>
            <label className={"input-group-text bg-" + status}>
              {icon}
            </label> 
          </Tooltip>
        </div>
      </div>
    );
  }
}

LoadBalanceSubmit.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LoadBalanceSubmit);