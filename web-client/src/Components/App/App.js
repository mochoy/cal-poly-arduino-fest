import React, { Component } from 'react';
import Slider from 'rc-slider';

import './App.css';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div className="App">
        <h1 id="title">Web-Controlled Nerf Blaster</h1>
        <div id="sliders-container">
          <div className="slider-wrapper">
            <h3 className="slider-title">Power</h3>
            <Slider min={0} max={100} defaultValue={80}/>
          </div>
          <div className="slider-wrapper">
            <h3 className="slider-title">Rate of Fire</h3>
            <Slider min={0} max={100} defaultValue={80}/>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
