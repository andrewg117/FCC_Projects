// array of inputs that includes their ids and text value
const inputs = [
  {
    id: "clear",
    value: "Clear"
  },
  {
    id: "divide",
    value: "/"
  },
  {
    id: "multiply",
    value: "*"
  },
  {
    id: "subtract",
    value: "-"
  },
  {
    id: "add",
    value: "+"
  },
  {
    id: "equals",
    value: "="
  },
  {
    id: "nine",
    value: "9"
  },
  {
    id: "eight",
    value: "8"
  },
  {
    id: "seven",
    value: "7"
  },
  {
    id: "six",
    value: "6"
  },
  {
    id: "five",
    value: "5"
  },
  {
    id: "four",
    value: "4"
  },
  {
    id: "three",
    value: "3"
  },
  {
    id: "two",
    value: "2"
  },
  {
    id: "one",
    value: "1"
  },
  {
    id: "decimal",
    value: "."
  },
  {
    id: "zero",
    value: "0"
  }
];

// Parent class that handles that creates each input component, displays their values and equate the expression
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.equalFunc = this.equalFunc.bind(this);
    this.getOp = this.getOp.bind(this);
    this.getDecimal = this.getDecimal.bind(this);
    this.state = {
      displayText: "0", // displays main results
      resultEntered: false,  // determines if new inputs replace or appends to the result
      lastOp: "", // checks for the last operator used
      decIsUsed: false, // prevents multiple decimals
      inputGroup: []
    };
  }

  // sets the state of the displayText when a numeric input is pressed
  handleClick(value) {
    let val = "";
    if (this.state.displayText === "0") {
      val = value;
    } else if (this.state.resultEntered == false) {
      val = this.state.displayText.concat(value);
    } else {
      val = value;
      this.setState({
        resultEntered: false
      });
    }
    this.setState({
      displayText: val,
      lastOp: ""
    });
  }

  // resets the state variables to their default values
  clearDisplay() {
    this.setState({
      displayText: "0",
      resultEntered: false,
      lastOp: "",
      decIsUsed: false
    });
  }

  // uses the eval function to equate string expressions
  equateInput(exp) {
    let result = "";
    try {
      result = eval(exp);
    } catch (err) {
      result = err.toString();
    }

    // rounds to 4 decimals
    if (result % 1 != 0) {
      return Number(Math.round(result + "e4") + "e-4").toString();
    } else {
      return result.toString();
    }
  }

  // sets the displayText to the result of equateInput
  equalFunc() {
    if (this.state.lastOp == "") {
      this.setState({
        displayText: this.equateInput(this.state.displayText),
        resultEntered: true
      });
    }
  }

  // handles to Operators when their input is selected and updates the state
  getOp(Op) {
    let newText = "";

    if (this.state.lastOp == "") {
      newText = this.state.displayText.concat(Op);
    } else if (
      this.state.lastOp != "" &&
      Op == "-" &&
      this.state.lastOp != "-"
    ) {
      newText = this.state.displayText.concat(Op);
    } else if (this.state.lastOp != "-") {
      newText = this.state.displayText.replace(/.$/, Op);
    } else {
      newText = this.state.displayText.replace(/[^\d].$/g, Op);
    }

    this.setState({
      lastOp: Op,
      displayText: newText,
      decIsUsed: false,
      resultEntered: false
    });
  }

  // handles decimal(.) input and updates state
  getDecimal(dec) {
    let newText = this.state.displayText;
    if (!this.state.decIsUsed && this.state.resultEntered == false) {
      newText = this.state.displayText.concat(dec);
    }

    this.setState({
      displayText: newText,
      decIsUsed: true
    });
  }

  componentDidMount() {
    this.setState({
      // creates each input component from the input array 
      inputGroup: inputs.map((input, index) => (
        <CalcInput
          key={index}
          handleClick={this.handleClick}
          clearDisplay={this.clearDisplay}
          equalFunc={this.equalFunc}
          getOp={this.getOp}
          getDecimal={this.getDecimal}
          inputID={input.id}
          value={input.value}
          lastOp={input.lastOp}
        />
      ))
    });
  }

  render() {
    return (
      <div id="calcFrame">
        <section id="displayBox">
          <h1 id="display">{this.state.displayText}</h1>
        </section>
        <section id="inputContainer">{this.state.inputGroup}</section>
      </div>
    );
  }
}

// child class that renders each input
class CalcInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // handles the input button press event 
  handleClick = (e) => {
    let oper = "";
    // finds the Operator inputs
    if (/[^\d.=]/.test(this.props.value)) {
      oper = this.props.inputID;
    }

    // sets the parent functions to the inputs using their ids
    switch (this.props.inputID) {
      case "clear":
        this.props.clearDisplay();
        break;
      case oper:
        this.props.getOp(this.props.value);
        break;
      case "decimal":
        this.props.getDecimal(this.props.value);
        break;
      case "equals":
        this.props.equalFunc();
        break;
      default:
        this.props.handleClick(this.props.value);
    }
  };

  render() {
    const { inputID, value } = this.props;
    return (
      <div style={{ "grid-area": inputID }}>
        <button id={inputID} onClick={this.handleClick}>
          {value}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
