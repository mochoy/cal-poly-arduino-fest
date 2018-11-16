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
        <p>Tech in your blaster to a whole new level.</p>
        <a href="https://www.montychoy.com/" target="_blank" id="link">montychoy.com</a>

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
        
        <p>Don't aim at eyes or face! Pleae don't touch the blaster unless you're aiming it and pick up all darts that you fire. Blaster is highly modified.</p>

        <div id="how-it-works">
          <h1 className="subtitle">How it works</h1>
          <p>The React client application submits a post request with the fetch API to the node web server. The web server receives a call to fire with the parameters to specify rate of fire and power and converts this into Arduino-readable serial-compatible ASCII code before outputing it to the appropriate serial port. When the Arduino receives the ASCII command from the webserver through serial, it is then mapped into an appropriate value to be analog written to the corresponding MOSFET motor controllers with protection from ESD, dV/dt, transient inductive spiking, and parascitic oscillation failure modes.</p>
        </div>

        <div id="technologies">
          <h1 className="subtitle">Technologies</h1>
          <div id="technologies-container">
            <div className="technologies-box">
              <h2>Frontend</h2>
              <p>React</p>
              <p>create-react-app</p>
              <p>rc-slider</p>
            </div>
            <div className="technologies-box">
              <h2>Backend</h2>
              <p>Node.js</p>
              <p>Express.js</p>
              <p>body-parser</p>
              <p>node-serialport</p>
              <p>nodemon</p>
            </div>
            <div className="technologies-box">
              <h2>Hardware</h2>
              <p>Arduino</p>
              <p>Serial</p>
              <p>Own company's MOSFET board</p>
            </div>
          </div>
        </div>

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
