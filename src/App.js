import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DrawSpace from './drawing/DrawSpace'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>App</p>
        <DrawSpace/>
      </div>
    );
  }
}

export default App;
