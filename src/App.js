import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MatrixDescriptor from './MatrixDescriptor.js';

const itemList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];

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
