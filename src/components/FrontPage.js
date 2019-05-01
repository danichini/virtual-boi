import React, { Component } from 'react'
import Header from './general/Header'
import { authentication } from '../store/Firebase'
import { Button } from '@material-ui/core';
import { withRouter} from 'react-router-dom'
// import LoginModal from './general/LoginModal';




class Frontpage extends Component {

  state = {
    logged: false,
  }


  componentWillMount() {
    authentication.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario logged', user)
        this.setState({logged: true})
        this.handleNavigationDashboard(user)
      } else {
        console.log('no existe sesion', user)
      }
    })
  }

  handleSignout = () => {
    authentication.signOut()
    .then(
      this.setState({ logged: false })
    )
    .catch(error => console.log(error));
  }


  handleNavigationDashboard = (value) => {
    const { uid } = value
    console.log(uid);
    
    const { history } = this.props
    history.push('./dashboard', { uid })
  }

  render() {
    const { logged } = this.state
    
    return (
      <div>
        <Header 
          navigateDashboard={() => this.handleNavigationDashboard()}
          loggedUser={logged}
          signout={this.handleSignout}
        />
      </div>
    )
  }
}

export default withRouter(Frontpage)