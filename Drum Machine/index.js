const pads = [
  {
    padText: "Q"
  },
  {
    padText: "W"
  },
  {
    padText: "E"
  },
  {
    padText: "A"
  },
  {
    padText: "S"
  },
  {
    padText: "D"
  },
  {
    padText: "Z"
  },
  {
    padText: "X"
  },
  {
    padText: "C"
  }
];

class DrumBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      displayText: "Press a Pad"
    };
  }

  handleClick(value) {
    console.log(value);
    this.setState({
      displayText: value
    });
  }

  render() {
    let padGroup = pads.map((pad, index) => (
      <Pad
        key={index}
        handleClick={this.handleClick}
        padText={pad.padText}
      />
    ));
    return (
      <div id="drum-container">
        <h1 id="display">{this.state.displayText}</h1>
        <div id="drum-machine">
          {padGroup}
        </div>
      </div>
    );
  }
}

const Pad = (props) => {
  handleClick = (event) => {
    props.handleClick(props.padText);
  };
  return (
    <div id="pad-container">
      <button class="drum-pad" id={props.padText} onClick={handleClick}>{props.padText}</button>
      <audio class="clip"  id={props.padText} />
    </div>
  );
};

ReactDOM.render(<DrumBox />, document.getElementById("root"));
