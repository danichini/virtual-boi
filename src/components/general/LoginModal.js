import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
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
  formStyle: {
    display: 'flex',
    justifyContent: 'center',
  }
});

class SimpleModal extends React.Component {

  render() {
    const { classes, openModal, closeModal, navigateDashboard } = this.props;

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
              <Typography variant="h6" id="modal-title" className={classes.formStyle}>
                Login Modal
              </Typography>
            </div>
          </div>
            <Typography variant="subtitle1" id="simple-modal-description" className={classes.formStyle}>
              <LoginForm navigateDashboard={navigateDashboard} />
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
