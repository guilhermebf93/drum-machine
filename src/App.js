import './App.css';
import React from 'react';

const banco1 = [{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];

const banco2 = [{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}];


const SwitchBanco = (props) => {
  return(
    <button onClick={props.handleClick} className='switch'>SWITCH</button>
  )
}

const Volume = (props) => {
  return(
    <input 
      type='range' 
      min='0'
      max='100'
      step='any'
      id='volume-slider'
      onChange={props.setVolume}
    />
  )
}

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playMusic = this.playMusic.bind(this);
    this.handleKeyClick = this.handleKeyClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    let mapArray = this.props.banco.map(item => item.keyCode === event.keyCode);
    for(let i = 0; i <= mapArray.length; i++) {
      if(mapArray[i]) {
        this.playMusic(event.keyCode);
      }
    }
  }

  handleKeyClick(event) {
    this.playMusic(event.target.value);
  }

  playMusic(code) {   
    let keyArray = this.props.banco.map(item => item.keyCode == code);
    let keyPressed = null;
    for(let i = 0; i <= keyArray.length; i++) {
      if(keyArray[i]) {
        keyPressed = this.props.banco[i];
        setTimeout(this.props.setScreen(keyPressed.id), 50);
      }
    }
    const sound = document.getElementById(keyPressed.keyTrigger);
    sound.currentTime = 0;
    sound.volume = this.props.volume;
    sound.play();
  }

  render() { 
    const buttons = this.props.banco.map(item => {
      return (
        <button 
          className='drum-pad'
          id={item.id}
          value={item.keyCode}
          onClick={this.handleKeyClick}
          >
            {item.keyTrigger}
            <audio 
              src={item.url}
              className='clip'
              id={item.keyTrigger}
            ></audio>          
        </button>
    )})
    

    return(
      <div className='buttons'>
        {buttons}
      </div>
    )
  }
}

const Screen = (props) => {
  return(
    <div className='screen' id='display'>{props.screen}</div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banco: banco1,
      selBanco1: true,
      screen: '',
      volume: 0.5
    };
    this.handleClick = this.handleClick.bind(this);
    this.setScreen = this.setScreen.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  handleClick() {
    const select = () => {
      if(this.state.selBanco1) return banco2;
      else return banco1;
    }
    
    this.setState(state => ({
      banco: select(),
      selBanco1: !state.selBanco1,
      screen: state.selBanco1 ? 'Smooth Piano Kit' : 'Heater Kit'
    }))
  }

  setScreen(string) {
    this.setState(() => ({
      screen: string
    }))
  }

  setVolume() {
    const volumeSlider = document.getElementById('volume-slider');
    this.setState(() => ({
      volume: parseInt(volumeSlider.value) / 100
    }))
  }

  render() {

    return(
      <div id="drum-machine">
        <Keyboard 
          banco={this.state.banco}
          setScreen={this.setScreen}
          volume={this.state.volume}
        />
        <div className='painel'>
          <Screen screen={this.state.screen} />
          <Volume setVolume={this.setVolume} />
          <SwitchBanco handleClick={this.handleClick} />
        </div>
      </div>
    )
  }
}

export default App;
