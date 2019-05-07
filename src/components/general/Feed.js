import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import { database } from '../../store/Firebase';

const styles = theme => ({
  container: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 400,
    width: '100%',
    // backgroundColor: 'coral'
  },
  divText: {
    display: 'flex',
    position: 'sticky',
    top: '40px',
    left: '40px'
  },
  textField: {
    width: '100%',
    color: 'red'
  },
  texto: {
    color: 'red'
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginLeft: 20
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: 'black',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 15,
    width: 200
  },
});

class Feed extends Component {

state = {
  message: '',
  biglist: [],
}

// componentWillMount() {
//   this.handleChatRequest()
// }

// handleChatRequest = () => {
//   database.ref(`Dashboard`)
//   .once('value')
//   .then(snapshot => {
//     const classes = []
//     snapshot.forEach((childSnapshot) => {
//       const publicacion = [childSnapshot.child("professor").val(), childSnapshot.child("className").val()]
//       classes.push(publicacion);
//     })
    
//     this.setState({biglist: classes.reverse()})
//   })
// }

  render() {

    // const { biglist } = this.state
    const { classes, chatlist } = this.props;
    
    const chatHistory = chatlist.map((value, i) => 
    <ListItem alignItems="flex-start" className={classes.texto} key={i}>
      <Avatar aria-label="Recipe" className={classes.avatar}>
        {value[0].charAt(0)}
      </Avatar>
      <ListItemText
        primary={`${value[0]} ha creado la clase`}
        secondary={
          <React.Fragment>
            {value[1]}
          </React.Fragment>
        }
      />
    </ListItem>
  )

    return (
      <div className={classes.container}>
        <div 
          className={classes.texto}
        >
        <List className={classes.root}>
          {chatHistory}
        </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Feed);