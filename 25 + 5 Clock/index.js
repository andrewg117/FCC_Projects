const timeType = ["session", "break"];

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.startClock = this.startClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.incTime = this.incTime.bind(this);
    this.state = {
      timeLeft: 25,
      breakLength: 5,
      sessionLength: 25,
      isStart: false
    };
  }

  convertTime(time) {
    let length = time * 60;
    let sec = length % 60;
    let min = Math.floor(length / 60);

    return (
      min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0")
    );
  }

  startClock() {
    this.setState({
      isStart: !this.state.isStart
    });
  }

  resetClock() {
    this.setState({
      timeLeft: 25,
      breakLength: 5,
      sessionLength: 25,
      isStart: false
    });
  }

  incTime(e) {
    if (e.target.id == "session-increment" && this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: this.state.sessionLength + 1
      });
    } else if (
      e.target.id == "session-decrement" &&
      this.state.sessionLength > 1
    ) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: this.state.sessionLength - 1
      });
    } else if (
      e.target.id == "break-increment" &&
      this.state.breakLength < 60
    ) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    } else if (e.target.id == "break-decrement" && this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  componentDidMount() {}

  render() {
    const {
      timeLeft,
      breakLength,
      sessionLength,
      isStart,
      resetClock
    } = this.state;

    return (
      <div id="clockFrame">
        <section style={{ "grid-area": "session" }}>
          <h2 id="timer-label">Session</h2>
          <h3 id="timer-left">{this.convertTime(timeLeft)}</h3>
        </section>
        <section style={{ "grid-area": "brLen" }}>
          <label id="break-label">Break Length</label>
          <p id="break-length">{breakLength}</p>
          <button id="break-increment" onClick={this.incTime}>
            Inc
          </button>
          <button id="break-decrement" onClick={this.incTime}>
            Dec
          </button>
        </section>
        <section style={{ "grid-area": "sessLen" }}>
          <label id="session-label">Session Length</label>
          <p id="session-length">{sessionLength}</p>
          <button id="session-increment" onClick={this.incTime}>
            Inc
          </button>
          <button id="session-decrement" onClick={this.incTime}>
            Dec
          </button>
        </section>
        <section style={{ "grid-area": "control" }}>
          <button id="start_stop" onClick={this.startClock}>
            {!isStart ? "Start" : "Pause"}
          </button>
          <button id="reset" onClick={this.resetClock}>
            Reset
          </button>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
