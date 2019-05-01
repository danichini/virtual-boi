import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Header from './general/Header';
import LiveChat from './general/LiveChat';
import TeacherDescription from './class/TeacherDescription';
import Resources from './class/Resources';
import Button from '@material-ui/core/Button'
import ResourcesModal from './general/ResourcesModal'
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
  classStyle: {
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: 100,
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  classTitle: {
    display: 'flex',
    justifyContent: 'space-around',
  }
});

let bigglit = []

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    resourcesModal: false,
    biglist: [],
  };

  componentWillMount() {
    this.handleDatabaseRequest()
  }

  handleDatabaseRequest = () => {
    const { location } = this.props
    const { state } = location
    console.log('location', state);
    database.ref(`class-resources/${state.navValue.classID}`)
    .once('value')
    .then(snapshot =>{
      snapshot.forEach((childSnapshot) => {
      const { key } = childSnapshot;
      database.ref(`Resources/${key}`)
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
    this.setState({ resourcesModal: true });
  }

  handleModalClose = (value) => {
    this.setState({ resourcesModal: false })
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

  render() {

    const { resourcesModal, biglist } = this.state
    const { classes, theme, location } = this.props;
    const { state } = location

    console.log('location', biglist);
    
    return (
      <div>
        <Header
          loggedUser={true}
          signout={this.handleSignout}
          name={state.navValue.professor}
        />
        <h1 className={classes.classTitle}> {state.navValue.className} </h1>
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
              <Tab label="Contenido" />
              <Tab label="Cronograma" />
              <Tab label="Discusion" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
            >
            <TabContainer dir={theme.direction}>
              <Resources biglist={biglist} />
            </TabContainer>
            <TabContainer dir={theme.direction}>Item Two</TabContainer>
            <TabContainer dir={theme.direction}>Item Three</TabContainer>
          </SwipeableViews>
        </div>
        
      <div>
        <TeacherDescription  teacherDes={state.navValue} />
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={this.handleModalOpen}
        >
          Subir Archivo
        </Button>
        <ResourcesModal
          openModal={resourcesModal}
          closeModal={this.handleModalClose}
          classID={state.navValue.classID}
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
