import React, { Component } from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import Dashboard from './components/Dashboard';
import ClassPage from './components/ClassPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <FrontPage /> */}
        <Dashboard />
        {/* <ClassPage /> */}
      </div>
    );
  }
}

export default App;
