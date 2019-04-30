import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Header from './general/Header';
import Classes from './dashboard/Classes';
import Button from '@material-ui/core/Button'
import ClassModal from './general/ClassModal'
import { database, authentication } from '../store/Firebase'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '60%'
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: '20%',
    fontSize: 20,
    fontFamily: 'Helvetica',
  }
});

let bigglit = []

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    classModal: false,
    biglist: [],
    logged: false,
    name: ''
  };


  componentWillMount() {
    this.getUsername()
    this.handleDatabaseRequest()
  }

  getUsername() {
    const { location } = this.props
    const { state } = location
    database.ref(`Users/${state.uid}`)
    .once('value')
    .then(snapshot => {
      this.setState({name: snapshot.child('name').val()}) }
    )
  }

  handleDatabaseRequest = () => {
    const { location } = this.props
    const { state } = location
    database.ref(`class-professor/${state.uid}`)
    .once('value')
    .then(snapshot =>{
      snapshot.forEach((childSnapshot) => {
      const { key } = childSnapshot;
      database.ref(`Classes/${key}`)
      .once('value')
      .then((snapshot) => {
        const classes = []
        snapshot.forEach((childSnapshot) => {
          const publicacion = childSnapshot.val();
          classes.push(publicacion);
          
        })
          bigglit.push(classes)
          this.setState({biglist: bigglit})
      })
    })
    bigglit = [];
  })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleModalOpen = (value) => {
    this.setState({ classModal: true });
  }

  handleModalClose = (value) => {
    this.setState({ classModal: false })
    this.setState({ biglist: [] })
    this.handleDatabaseRequest()
  }

  handleSignout = () => {
    const { history } = this.props
    authentication.signOut()
    .then(
      history.push('./')
    )
    .catch(error => console.log(error));
  }

  handleNavigationClassPage = (value) => {
    const { rowData } = value
    const { history } = this.props
    history.push('./classpage', { navValue: rowData })
  }

  render() {
    const { classModal, biglist, name } = this.state;
    const { classes, theme, location } = this.props;
    const { state } = location
    console.log('dashboard', location);
    
    return (
      <div>
        <Header 
          loggedUser={true}
          signout={this.handleSignout}
          name={name}
        />
        <h1> Bienvenido a tu Dashboard </h1>
      <div className={classes.container}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
        
      <div>
        <Classes 
          listClass={biglist}
          navClass={this.handleNavigationClassPage}
        />
          <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={this.handleModalOpen}
          >
          Crear nueva clase
        </Button>
        <ClassModal
          openModal={classModal}
          closeModal={this.handleModalClose}
          professorID={state.uid}
          name={name}
        />
      </div>
    </div>
    </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
