
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.startClock = this.startClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.incTime = this.incTime.bind(this);
    this.state = {
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isStart: false,
      onBreak: false
    };
  }

  convertTime(time) {
    let length = time;
    let sec = length % 60;
    let min = Math.floor(length / 60);

    return (
      min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0")
    );
  }
  
  changeSession() {
    if(!this.state.onBreak && this.state.timeLeft == 0){
      this.setState({
        onBreak: true,
        timeLeft: (this.state.breakLength + 1) * 60
      });
    } else if(this.state.onBreak && this.state.timeLeft == 0){
      this.setState({
        onBreak: false,
        timeLeft: (this.state.sessionLength + 1) * 60
      });
    } 
  }

  startClock() {
     let timer = setInterval(() => {
      this.changeSession();
      if(this.state.isStart && this.state.timeLeft > 0){
        this.setState({
          timeLeft: this.state.timeLeft - 1
        });
      } else {
        clearInterval(timer);
        // console.log(timer);
      }
    }, 1000);
    
    this.setState({
      isStart: !this.state.isStart,
    });
  }

  resetClock() {
    clearInterval(this.state.timer);
    this.setState({
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isStart: false,
      onBreak: false
    });
  }
  
  incTime(e) {
    const { sessionLength, breakLength, onBreak, timeLeft } = this.state;
    
    if (e.target.id == "session-increment" && sessionLength < 60) {
      this.setState({
        sessionLength: sessionLength + 1,
        timeLeft: !onBreak ? (sessionLength + 1) * 60: timeLeft
      });
    } else if (
      e.target.id == "session-decrement" &&
      sessionLength > 1
    ) {
      this.setState({
        sessionLength: sessionLength - 1,
        timeLeft: !onBreak ? (sessionLength - 1) * 60: timeLeft
      });
    } else if (
      e.target.id == "break-increment" &&
      breakLength < 60 
    ) {
      this.setState({
        breakLength: breakLength + 1,
        timeLeft: onBreak ? (breakLength + 1) * 60 : timeLeft
      });
    } else if (e.target.id == "break-decrement" && breakLength > 1) {
      this.setState({
        breakLength: breakLength - 1,
        timeLeft: onBreak ? (breakLength - 1) * 60 : timeLeft
      });
    }
  }
  
  
  componentDidMount() {
  }

  render() {
    const {
      timeLeft,
      breakLength,
      sessionLength,
      isStart,
      resetClock,
      onBreak
    } = this.state;

    return (
      <div id="clockFrame">
        <section style={{ "grid-area": "session" }}>
          <h2 id="timer-label">{onBreak ? 'Break' : 'Session'}</h2>
          <h3 id="time-left">{this.convertTime(timeLeft)}</h3>
        </section>
        <section style={{ "grid-area": "brLen" }}>
          <label id="break-label">Break Length</label>
          <p id="break-length">{breakLength}</p>
          <button id="break-increment" onClick={!isStart? this.incTime: null}>
            Inc
          </button>
          <button id="break-decrement" onClick={!isStart? this.incTime: null}>
            Dec
          </button>
        </section>
        <section style={{ "grid-area": "sessLen" }}>
          <label id="session-label">Session Length</label>
          <p id="session-length">{sessionLength}</p>
          <button id="session-increment" onClick={!isStart? this.incTime: null}>
            Inc
          </button>
          <button id="session-decrement" onClick={!isStart? this.incTime: null}>
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
