import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { database } from '../../store/Firebase';

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
    height: '70%',
    width: 200
  },
});

class LiveChat extends Component {

  
state = {
  chatLog: [['Daniel','holi'],['Luis','papu']],
  message: '',
}

handleChange = message => event => {
  this.setState({
    [message]: event.target.value,
  });
};

handleSend = (value) => {
  console.log(value)
  this.setState({
    message: '',
  });
  // database.ref
}

  render() {

    const { chatLog, message } = this.state
    const { classes } = this.props;

    console.log(chatLog)

    const chatHistory = chatLog.map((value) => 
    <ListItem alignItems="flex-end" className={classes.texto}>
      <Avatar aria-label="Recipe" className={classes.avatar}>
        {value[0].charAt(0)}
      </Avatar>
      <ListItemText
        primary={value[0]}
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
        <div 
          className={classes.divText}
        >

        <TextField
          id="outlined-name"
          label='enviar mensaje'
          className={classes.textField}
          value={message}
          onChange={this.handleChange('message')}
          margin="normal"
          variant="outlined"
        />
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={() => this.handleSend(message)}
        >
          send
        </Button>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(LiveChat);