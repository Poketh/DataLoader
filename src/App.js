import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MatrixDescriptor from './MatrixDescriptor.js';

const itemList = Array(150).fill().map((x,i) => i);

class App extends Component {
  render() {
    return (
      <div className="App">
        { itemList.map(n => <MatrixDescriptor key={n} num={n}/>) }
      </div>
    );
  }
}

export default App;
