const pads = [
  {
    padText: "Q",
    keyCode: 81,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-ClHat01.mp3",
    audioText: "ClHat01"
  },
  {
    padText: "W",
    keyCode: 87,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-ClHat02.mp3",
    audioText: "ClHat02"
  },
  {
    padText: "E",
    keyCode: 69,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Kick01.mp3",
    audioText: "Kick01"
  },
  {
    padText: "A",
    keyCode: 65,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Kick02.mp3",
    audioText: "Kick02"
  },
  {
    padText: "S",
    keyCode: 83,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Kick03.mp3",
    audioText: "Kick03"
  },
  {
    padText: "D",
    keyCode: 68,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-OpHat.mp3",
    audioText: "OpHat"
  },
  {
    padText: "Z",
    keyCode: 90,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Shkr01.mp3",
    audioText: "Shkr01"
  },
  {
    padText: "X",
    keyCode: 88,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Snr01.mp3",
    audioText: "Snr01"
  },
  {
    padText: "C",
    keyCode: 67,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Tamb.mp3",
    audioText: "Tamb"
  }
];

class DrumBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      displayText: "Press a Pad",
      padGroup: []
    };
  }

  handleClick(value) {
    // console.log(value);
    this.setState({
      displayText: value
    });
  }

  componentDidMount() {
    this.setState({
      padGroup: pads.map((pad, index) => (
        <Pad
          key={index}
          handleClick={this.handleClick}
          padText={pad.padText}
          keyCode={pad.keyCode}
          audio={pad.audio}
          audioText={pad.audioText}
        />
      ))
    });
  }

  render() {
    return (
      <div id="drum-container">
        <h1 id="display">{this.state.displayText}</h1>
        <div id="drum-machine">{this.state.padGroup}</div>
      </div>
    );
  }
}

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.state = {
      isPressed: false
    };
  }

  onPress() {
    this.setState({
      isPressed: !this.state.isPressed
    });
  }

  playClip(id) {
    let player = document.getElementById(id);
    player.play();
  }

  handleClick = (event) => {
    this.props.handleClick(this.props.audioText);
    this.playClip(this.props.padText);
    this.onPress();
    setTimeout(() => this.onPress(), 100);
  };

  handleKey(event) {
    if (event.keyCode == this.props.keyCode) {
      this.props.handleClick(this.props.audioText);
      this.playClip(this.props.padText);
      this.onPress();
      setTimeout(() => this.onPress(), 100);
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKey);

    return () => {
      window.removeEventListener("keydown", this.handleKey);
    };
  }

  render() {
    return (
      <div id="pad-container">
        <button
          id={this.props.audioText}
          className={!this.state.isPressed ? "drum-pad" : "drum-pad pressed"}
          onClick={this.handleClick}
        >
          {this.props.padText}
          <audio
            className="clip"
            id={this.props.padText}
            src={this.props.audio}
          />
        </button>
      </div>
    );
  }
}

ReactDOM.render(<DrumBox />, document.getElementById("root"));
