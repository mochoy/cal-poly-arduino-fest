import React, { Component } from 'react';
import Slider from 'rc-slider';

import './App.css';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      power: 0,
      rof: 0

    }
  }

  render() {
    return (
      <div className="App">
        <h1 id="title">Web-Controlled Nerf Blaster</h1>
        <div id="sliders-container">
          <div className="slider-wrapper">
            <h3 className="slider-title">Power</h3>
            <Slider min={0} max={100} defaultValue={80}
              onChange={(newSliderPos) => {
                this.setState({
                  rof: newSliderPos
                });
              }}/>
          </div>
          <div className="slider-wrapper">
            <h3 className="slider-title">Rate of Fire</h3>
            <Slider min={0} max={100} defaultValue={80} 
              onChange={(newSliderPos) => {
                this.setState({
                  rof: newSliderPos
                });
              }}/>
          </div>
        </div>

        <button 
          id="fire-btn"
          onClick={() => {
            console.log("clicked")
          }}>
          <h4 id="fire-btn-txt">FIRE</h4>
        </button>
        
      </div>
    );
  }
}

export default App;
