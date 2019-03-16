import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import LoginForm from './LoginForm'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  closeStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
});

class SimpleModal extends React.Component {

  render() {
    const { classes, openModal, closeModal } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={ openModal }
          onClose={() => closeModal('loginModal')}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <div>
            <div>
              <Typography variant="h6" id="modal-title">
                Login Modal
              </Typography>
            </div>
            <div className={classes.closeStyle}> 
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => closeModal('loginModal')}>
                  <Close />
              </IconButton>
            </div>
          </div>
            <Typography variant="subtitle1" id="simple-modal-description">
              <LoginForm />
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const LoginModal = withStyles(styles)(SimpleModal);

export default LoginModal;
