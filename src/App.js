import React, { Component } from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import Dashboard from './components/Dashboard';
import ClassPage from './components/ClassPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={FrontPage}/>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/classpage" component={ClassPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
