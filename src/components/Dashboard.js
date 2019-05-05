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
import AllClassesModal from './general/AllClassesModal'
import { database, authentication } from '../store/Firebase'
import AllClasses from './dashboard/AllClasses'
import Feed from './general/Feed'

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
  },
  dashboardTitle: {
    display: 'flex',
    justifyContent: 'space-around',
  }
});

let classlit =[]
let bigglit = []

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    classModal: false,
    nameClassModal: '',
    classID: '',
    AllclassModal: false,
    biglist: [],
    classlist: [],
    logged: false,
    name: '',
    professor: false,
  };


  componentWillMount() {
    this.getUsername()
  }

  getUsername() {
    const { location } = this.props
    const { state } = location
    database.ref(`Users/${state.uid}`)
    .once('value')
    .then(snapshot => {
      this.setState(
      {
        name: snapshot.child('name').val(), 
        professor: snapshot.child('professor').val(),
      })
      this.handleDatabaseRequest(snapshot.child('professor').val())
    }
    )
  }

  handleDatabaseRequest = (value) => {


    const { location } = this.props
    const { state } = location

    if (value) {
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
    } else {
      this.handleAllClassTable()
      this.handleClassesStudentTable()
    }
  }

  handleAllClassTable = () => {
    
      database.ref(`Classes`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(
          (childSnapshot) => {
            const { key } = childSnapshot;
            database.ref(`Classes/${key}`)
            .once('value')
            .then((snapshot) => {
              const classes = []
              snapshot.forEach((childSnapshot) => {
                const publicacion = childSnapshot.val();
                classes.push(publicacion);
                
              })
                classlit.push(classes)
                this.setState({classlist: classlit})
            })
          }
        )
        classlit = [];
      })
  }

  handleClassesStudentTable = () => {

    const { location } = this.props
    const { state } = location

    database.ref(`class-student/${state.uid}`)
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

  handleModalAllOpen = (value) => {
    const { rowData } = value
    this.setState({ 
      AllclassModal: true,
      nameClassModal: rowData.className,
      classID: rowData.classID,
    });
  }

  handleModalClose = (value) => {
    this.setState({ classModal: false })
    this.setState({ AllclassModal: false })
    this.setState({ biglist: [] })
    this.setState({ classlist: [] })
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

  handleSubscribeToClass = (value) => {
    const { location } = this.props;
    const { state } = location
    database.ref(`class-student/${state.uid}`)
        .update({
          [value]: true
        })
        .then(this.handleModalClose
        )
  }

  handleNavigationClassPage = (value) => {
    const { rowData } = value
    const { professor, name } = this.state
    const { history } = this.props
    history.push('./classpage', { 
      navValue: rowData,
      professor,
      name,
    })
  }

  render() {
    const {
      classModal,
      AllclassModal,
      biglist,
      classlist,
      name,
      professor,
      nameClassModal,
      classID,
    } = this.state;
    const { classes, theme, location } = this.props;
    const { state } = location

    
    return (
      <div>
        <Header 
          loggedUser={true}
          signout={this.handleSignout}
          name={name}
        />
        <h1 className={ classes.dashboardTitle }> Bienvenido a tu Dashboard </h1>
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
            { professor ? 
              (<Tab label="Feed" />)
            : (<Tab label="Clases abiertas" />
            )
            }
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          >
          {professor ? 
              (<TabContainer dir={theme.direction}>
                <Feed />
              </TabContainer>)
            : (<TabContainer dir={theme.direction}>
            <AllClasses 
              listClass={classlist}
              handleSubscribeToClass={this.handleSubscribeToClass}
              openModal={this.handleModalAllOpen}
            />
          </TabContainer>)
          }
          
          
        </SwipeableViews>
      </div>
      { professor ? (<div>
        <Classes 
          listClass={biglist}
          navClass={this.handleNavigationClassPage}
          professor={professor}
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
      </div>) : <div>
        <Classes 
          listClass={biglist}
          navClass={this.handleNavigationClassPage}
          professor={professor}
        />
        <AllClassesModal
          openModal={AllclassModal}
          closeModal={this.handleModalClose}
          professorID={state.uid}
          name={name}
          nameClassModal={nameClassModal}
          classID={classID}
          handleSubscribeToClass={this.handleSubscribeToClass}
        />
      </div>
      }
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
