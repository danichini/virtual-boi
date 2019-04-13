import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ClassForm from './ClassForm'

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
    const { classes, openModal, closeModal } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={ openModal }
          onClose={() => closeModal('signupModal')}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <div>
            <div>
              <Typography variant="h6" id="modal-title" className={classes.formStyle}>
                CREAR NUEVA CLASE
              </Typography>
            </div>
          </div>
            <Typography variant="subtitle1" id="simple-modal-description" className={classes.formStyle}>
              <ClassForm />
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
const ClassModal = withStyles(styles)(SimpleModal);

export default ClassModal;
