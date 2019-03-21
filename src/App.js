import React, { Component } from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <FrontPage /> */}
        <Dashboard />
      </div>
    );
  }
}

export default App;
