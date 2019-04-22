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
import { database } from '../store/Firebase'

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

const bigglit = []

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    classModal: false,
    biglist: [],
  };


  componentWillMount() {
    database.ref('class-professor/1Gu8fzzWzGZY1D9g2nJ27FRPcrN2/')
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
          console.log('mount',bigglit);
          this.setState({biglist: bigglit})
      })
    })
  })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleModalClass = () => {
    
  }

  handleModalOpen = (value) => {
    this.setState({ classModal: true });
  }

  handleModalClose = (value) => {
    this.setState({ classModal: false })
  }

  render() {
    const { classModal, biglist } = this.state;
    const { classes, theme } = this.props;
    console.log( 'dashboard list', biglist );
    
    return (
      <div>
        <Header />
        <h1> Dashboard </h1>
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
        <Classes listClass={biglist}/>
          <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={this.handleModalOpen}
          >
          Crear nueva clase
        </Button>
        <ClassModal openModal={classModal} closeModal={this.handleModalClose} />
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
