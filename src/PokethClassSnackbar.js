import React                  from 'react';
import PropTypes              from 'prop-types';
import { withStyles }         from '@material-ui/core/styles';
import Button                 from '@material-ui/core/Button';
import Snackbar               from '@material-ui/core/Snackbar';
import SnackbarContent        from '@material-ui/core/SnackbarContent';
import IconButton             from '@material-ui/core/IconButton';
import Icon                   from '@material-ui/core/Icon';
import CloseIcon              from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
  },
  snackbar: {
    height: 70,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  submit: {
    backgroundColor: theme.palette.primary.dark,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

class PokethClassSnackbar extends React.Component {
  render() {
    const { classes } = this.props;
    const classMsg    = "Poketh Class " + this.props.pokethClass;
    const errorMsg    = "No wallet available";
    const noAddress   = this.props.coinbase === 'no address';
    const icon        = noAddress ? <Icon className={classes.rightIcon}>close</Icon> : <Icon className={classes.rightIcon}>arrow_forward_ios</Icon>;
    const btnMsg      = noAddress ? "Dismiss" : "Collect";
    
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
            horizontal: 'center',
        }}
        open={this.props.open}
        onClose={this.props.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        >
        <SnackbarContent
          className={noAddress ? classes.error : classes.submit}
          message={<span id="message-id">{noAddress ? errorMsg : classMsg}</span>}
          action={[
            <Button
              key="submit"
              variant="contained"
              onClick={this.props.handleSignature}
              >
              {btnMsg} 
              {icon}
            </Button>,
          ]}
          />
      </Snackbar>

    );
  }
}

PokethClassSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PokethClassSnackbar);