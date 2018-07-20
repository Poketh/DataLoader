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
    backgroundColor: "#EAEAEA",
    color: "#1D1F21",
  },
});

class PokethClassSnackbar extends React.Component {
  render() {
    const { classes } = this.props;
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
          className={classes.submit}
          message={<span id="message-id">Poketh Class {this.props.pokethClass}</span>}
          action={[
            <Button
              key="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.props.handleSignature}
            >
              Collect 
              <Icon className={classes.rightIcon}>arrow_forward_ios</Icon>
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