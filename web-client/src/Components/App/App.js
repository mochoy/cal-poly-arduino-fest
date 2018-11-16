import React, { Component } from 'react';
import Slider from 'rc-slider';

import './App.css';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.fire = this.fire.bind(this);

    this.fireDelay = 200;

    this.state = {
      lastFireTime: 0,
      power: 0,
      rof: 0,
      shotsFired: 0
    }
  }

  render() {
    return (
      <div className="App">
        <h1 id="title">Web-Controlled Nerf Blaster</h1>

        <div id="sliders-container">
          <div className="slider-wrapper">
            <h3 className="slider-title">Power</h3>
            <Slider min={0} max={255} defaultValue={200}
              onChange={(newSliderPos) => {
                this.setState({
                  rof: newSliderPos
                });
              }}/>
          </div>
          <div className="slider-wrapper">
            <h3 className="slider-title">Rate of Fire</h3>
            <Slider min={0} max={255} defaultValue={200} 
              onChange={(newSliderPos) => {
                this.setState({
                  rof: newSliderPos
                });
              }}/>
          </div>
        </div>

        <button 
          id="fire-btn"
          onClick={this.fire}>
          <h4 id="fire-btn-txt">FIRE</h4>
        </button>

        <p id="shotsFired-txt">{this.state.shotsFired + " shots fired"}</p>
        
      </div>
    );
  }

  fire() {
    let ms = new Date().getTime();

    if (this.state.lastFireTime + this.fireDelay < ms) {
      this.setState({
        lastFireTime: ms,
        shotsFired: this.state.shotsFired + 1
      });
    }
  }

}

export default App;
