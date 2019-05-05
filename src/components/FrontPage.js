import React, { Component } from 'react'
import Header from './general/Header'
import { authentication } from '../store/Firebase'
import { withRouter} from 'react-router-dom'
import fp from '../utils/fp.png'
// import LoginModal from './general/LoginModal';


const styles = {
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  image: {
    marginTop: 20,
    width: '70%',
    height: '100%'
  },
  helloTextContainer: {
    marginTop: 60,
    padding: 40,
    display: 'flex',
    width: '30%',
    height: '100%',
    justifyContent: 'center'
  },
  helloText: {
    fontSize: 60,
    textAlign: 'center'
  },
  helloSubText: {
    marginTop: 40,
    fontSize: 20,
    textAlign: 'justify'
  }
}

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
      <div style={styles.container}>
        <div style={styles.helloTextContainer}>
          <div style={styles.helloText}>
            AULA VIRTUAL

            <div style={styles.helloSubText}>
            Aplicación web enfocada en proveer una herramienta tecnológica donde los usuarios puedan acceder a
            diferentes tipos de información referente a diversos tópicos de interés y que aporte herramientas para 
            la interacción con los profesores
            </div>
          </div>
          
        </div>
        <div style={styles.image}>
          <img 
            height={600} width={1100}
            alt='logo'
            src={fp}/>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(Frontpage)