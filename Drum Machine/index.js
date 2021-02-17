// Array of drum pads
/*
Audio ref: https://www.musicradar.com/news/drums/1000-free-drum-samples
SampleRadar: 1,000 free drum samples
by The MusicRadar team
*/
const pads = [
  {
    padText: "Q",
    keyCode: 81,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-ClHat01.mp3",
    audioText: "Hat01"
  },
  {
    padText: "W",
    keyCode: 87,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-ClHat02.mp3",
    audioText: "Hat02"
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
    audioText: "Hat"
  },
  {
    padText: "Z",
    keyCode: 90,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Shkr01.mp3",
    audioText: "Shaker"
  },
  {
    padText: "X",
    keyCode: 88,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Snr01.mp3",
    audioText: "Snare"
  },
  {
    padText: "C",
    keyCode: 67,
    audio:
      "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/Drum%20Machine/audio/CYCdh_VinylK1-Tamb.mp3",
    audioText: "Tamb"
  }
];

// Parent class that contains each pad and displays their audioText
class DrumBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      displayText: "Press a Pad",
      padGroup: []
    };
  }

  // Displays audioText when a pad is pressed
  handleClick(value) {
    this.setState({
      displayText: value
    });
  }

  componentDidMount() {
    this.setState({
      // Creates each Pad component and sets them to the padGroup state
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
    const { displayText, padGroup } = this.state;
    return (
      <div id="drum-container">
        <h1 id="display">{displayText}</h1>
        <div id="drum-machine">{padGroup}</div>
      </div>
    );
  }
}

// Child class that renders each pad
class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.state = {
      isPressed: false
    };
  }

  // Toggles the css class when a pad is pressed
  onPress() {
    this.setState({
      isPressed: !this.state.isPressed
    });
  }

  // Takes in the pad and audio text to play the audio element and pass its text in to the display
  playPad(padText, audioText) {
    let player = document.getElementById(padText);
    player.currentTime = 0;
    player.play();
    this.props.handleClick(audioText); // Click function from the Parent class
    this.onPress();
    setTimeout(() => this.onPress(), 200);
  }

  // Handles the mouse click
  handleClick = (event) => {
    this.playPad(this.props.padText, this.props.audioText);
  };

  // Handles the keyboard press
  handleKey(event) {
    if (event.keyCode == this.props.keyCode) {
      this.playPad(this.props.padText, this.props.audioText);
    }
  }

  componentDidMount() {
    // Listens for key presses
    window.addEventListener("keydown", this.handleKey);

    return () => {
      window.removeEventListener("keydown", this.handleKey);
    };
  }

  render() {
    const { isPressed } = this.state;
    const { audioText, padText, audio } = this.props;

    return (
      <div id="pad-container">
        <button
          id={audioText}
          className={!isPressed ? "drum-pad" : "drum-pad pressed"}
          onClick={this.handleClick}
        >
          {padText}
          <audio className="clip" id={padText} src={audio} />
        </button>
      </div>
    );
  }
}

ReactDOM.render(<DrumBox />, document.getElementById("root"));
