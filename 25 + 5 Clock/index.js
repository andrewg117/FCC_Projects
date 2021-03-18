/* 
  https://orangefreesounds.com/cool-alarm-tone-notification-sound/
  Cool Alarm Tone Notification Sound
  Posted by: by alexander June 19, 2018
  The sound effect is permitted for non-commercial use under license “Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)”
*/
const audio =
  "https://raw.githubusercontent.com/andrewg117/FCC_Projects/main/25 %2B 5 Clock/audio/Cool-alarm-tone-notification-sound.mp3";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.startClock = this.startClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.incTime = this.incTime.bind(this);
    this.alarm = 0; 

    this.state = {
      timeLeft: 1500, // value of current time to be displayed in the time-left element
      breakLength: 5, // value of current break time to be displayed in the break-length element
      sessionLength: 25, // value of current session time to be displayed in the session-length element
      isStart: false, // bool to change the Start/Pause state
      onBreak: false // bool to change the session/break state
    };
  }

  // converts the time lengths to mm:ss
  convertTime(time) {
    let length = time;
    let sec = length % 60;
    let min = Math.floor(length / 60);

    return (
      min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0")
    );
  }

  // plays the alarm object and pauses it after 3 seconds
  playAlarm() {
    this.alarm.currentTime = 0;
    this.alarm.play();
    setTimeout(() => {
      this.alarm.pause();
    }, 3000);
  }

  // alternates the timeLeft state based on the onBreak bool and plays the alarm
  changeSession() {
    const { sessionLength, breakLength, onBreak, timeLeft } = this.state;

    if (!onBreak && timeLeft == 0) {
      this.playAlarm();

      this.setState({
        onBreak: true,
        timeLeft: breakLength * 60 + 1
      });
    } else if (onBreak && timeLeft == 0) {
      this.playAlarm();

      this.setState({
        onBreak: false,
        timeLeft: sessionLength * 60 + 1
      });
    }
  }

  // alternates the isStart state to start/pause the clock when the start_stop element is pressed
  startClock() {
    // a timer that decrements the timeLeft state and calls the changeSession function when timeLeft is 00:00
    let timer = setInterval(() => {
      this.changeSession();

      if (this.state.isStart && this.state.timeLeft > 0) {
        this.setState({
          timeLeft: this.state.timeLeft - 1
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    this.setState({
      isStart: !this.state.isStart
    });
  }

  // resets the clock state and alarm to default when the reset element is pressed
  resetClock() {
    this.alarm.pause();
    this.alarm.currentTime = 0;

    this.setState({
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isStart: false,
      onBreak: false
    });
  }

  // increases/decreases the session/break length state based on the elements id
  incTime(e) {
    const { sessionLength, breakLength, onBreak, timeLeft } = this.state;

    if (e.target.id == "session-increment" && sessionLength < 60) {
      this.setState({
        sessionLength: sessionLength + 1,
        timeLeft: !onBreak ? (sessionLength + 1) * 60 : timeLeft
      });
    } else if (e.target.id == "session-decrement" && sessionLength > 1) {
      this.setState({
        sessionLength: sessionLength - 1,
        timeLeft: !onBreak ? (sessionLength - 1) * 60 : timeLeft
      });
    } else if (e.target.id == "break-increment" && breakLength < 60) {
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
    // initializes the alarm object to the beep element and sets the volumn to 20%
    this.alarm = document.getElementById("beep");
    this.alarm.volume = 0.2;
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
          <h2 id="timer-label">{onBreak ? "Break" : "Session"}</h2>
          <h1 id="time-left">{this.convertTime(timeLeft)}</h1>
          <audio id="beep" src={audio} />
        </section>
        <section style={{ "grid-area": "brLen" }}>
          <label id="break-label">Break Length</label> <br/>
          <button id="break-increment" onClick={!isStart ? this.incTime : null}>
            +
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-decrement" onClick={!isStart ? this.incTime : null}>
            -
          </button>
        </section>
        <section style={{ "grid-area": "sessLen" }}>
          <label id="session-label">Session Length</label><br/>
          <button
            id="session-increment"
            onClick={!isStart ? this.incTime : null}
          >
            +
          </button>
          <span id="session-length">{sessionLength}</span>
          <button
            id="session-decrement"
            onClick={!isStart ? this.incTime : null}
          >
            -
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
