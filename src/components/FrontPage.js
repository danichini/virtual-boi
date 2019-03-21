import React, { Component } from 'react'
import Header from './general/Header'
import { authentication } from '../store/Firebase'
// import LoginModal from './general/LoginModal';




export default class Frontpage extends Component {

  state = {
    logged: false,
  }


  componentWillMount() {
    authentication.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario logged', user)
        this.setState({logged: true})
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


  render() {
    const { logged } = this.state
    console.log('renderFront', logged );
    
    return (
      <div>
        <Header loggedUser={logged} signout={this.handleSignout} />
      </div>
    )
  }
}
