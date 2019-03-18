import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

const styles = theme =>  ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    loginModal: false,
    signupModal: false,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleModalOpen = (value) => {
    this.setState({ [value]: true });
  }

  handleModalClose = (value) => {
    this.setState({ [value]: false })
  }

  handleSignout = () => {
    const {loggedUser} = this.props
    console.log('signOut', loggedUser);
    
  }
  render() {
    const { classes, loggedUser } = this.props;
    const { anchorEl, loginModal, signupModal } = this.state;
    const open = Boolean(anchorEl);
    console.log('render', loggedUser);
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              VirtualBoi
            </Typography>
            {loggedUser ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleSignout}>SignOut</MenuItem>
                </Menu>
              </div>
            ) : (<div>
              <LoginModal openModal={loginModal} closeModal={this.handleModalClose}/>
              <SignupModal openModal={signupModal} closeModal={this.handleModalClose}/>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  className={classes.button}
                  onClick={() => this.handleModalOpen('loginModal')}
                  >
                  Login
                  <AccountCircle className={classes.rightIcon}/>
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  className={classes.button}
                  onClick={() => this.handleModalOpen('signupModal')}
                  >
                  Signup
                  <AccountCircle className={classes.rightIcon}/>
                </Button>
              </div>)
          
          }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
