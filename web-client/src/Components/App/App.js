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
      power: 200,
      rof: 200,
      shotsFired: 0
    }
  }

  render() {
    return (
      <div className="App">
        <h1 id="title">Web-Controlled Nerf Blaster</h1>
        <p>Monty Choy</p>

        <div id="sliders-container">
          <div className="slider-wrapper">
            <h3 className="slider-title">Power</h3>
            <Slider min={0} max={250} defaultValue={200}
              onChange={(newSliderPos) => {
                this.setState({
                  power: newSliderPos/10
                });
              }}/>
          </div>
          <div className="slider-wrapper">
            <h3 className="slider-title">Rate of Fire</h3>
            <Slider min={0} max={250} defaultValue={200} 
              onChange={(newSliderPos) => {
                this.setState({
                  rof: newSliderPos/10
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
        
        <p>Don't aim at eyes or face! Pleae don't touch the blaster unless you're aiming it and pick up all darts that you fire.</p>

      </div>
    );
  }

  fire() {
    let ms = new Date().getTime();
    if (this.state.lastFireTime + this.fireDelay < ms) {
      fetch("/api/fire", {
        method: 'POST',
        body: JSON.stringify({
          power: this.state.power,
          rof: this.state.rof,
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then((res) => {
          console.log(res);
        }
      );
      this.setState({
        lastFireTime: ms,
        shotsFired: this.state.shotsFired + 1
      });
    }
  }    

}

export default App;
