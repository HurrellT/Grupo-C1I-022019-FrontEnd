import React, { Component } from 'react';
import MapComponent from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="map">
        <MapComponent />
      </div>
    );
  }
}

export default App;
