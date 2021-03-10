const inputs = [
  {
    id: 'clear',
    value: 'Clear'
  },
  {
    id: 'divide',
    value: '/'
  },
  {
    id: 'multiply',
    value: '*'
  },
  {
    id: 'subtract',
    value: '-'
  },
  {
    id: 'add',
    value: '+'
  },
  {
    id: 'equals',
    value: '='
  },
  {
    id: 'nine',
    value: '9'
  },
  {
    id: 'eight',
    value: '8'
  },
  {
    id: 'seven',
    value: '7'
  },
  {
    id: 'six',
    value: '6'
  },
  {
    id: 'five',
    value: '5'
  },
  {
    id: 'four',
    value: '4',
  },
  {
    id: 'three',
    value: '3'
  },
  {
    id: 'two',
    value: '2'
  },
  {
    id: 'one',
    value: '1'
  },
  {
    id: 'decimal',
    value: '.'
  },
  {
    id: 'zero',
    value: '0'
  }
]

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.equalFunc = this.equalFunc.bind(this);
    this.state = {
      displayText: '0',
      inputGroup: []
    }
  }
  
  handleClick(value) {
    let val = '';
    if(this.state.displayText === '0'){
      val = value;
    } else {
      val = this.state.displayText.concat(value);
    }
    this.setState({
      displayText: val
    });
  }
  
  clearDisplay() {
    this.setState({
      displayText: '0'
    });
  }
  
  equateInput(exp) {
    let result = '';
    try {
      result = eval(exp);
    } catch (err){
      result = err.toString();
    }
    
    if(result % 1 != 0){
      return Number(Math.round(result + 'e4') + 'e-4').toString();
      
    } else {
      return result.toString();
    }
  }
  
  equalFunc() {
    this.setState({
      displayText: this.equateInput(this.state.displayText)
    });
  }
  
  componentDidMount() {
    this.setState({
      // Creates each Pad component and sets them to the padGroup state
      inputGroup: inputs.map((input, index) => (
        <CalcInput
          key={index}
          handleClick={this.handleClick}
          clearDisplay={this.clearDisplay}
          equalFunc={this.equalFunc}
          inputID={input.id}
          value={input.value}
        />
      ))
    });
  }
  
  render(){
    return(
      <div id="calcFrame">
        <section id="displayBox">
          <h1 id="display">{this.state.displayText}</h1>
        </section>
        <section id="inputContainer">
          {this.state.inputGroup}
          
        </section>
      </div>
    );
  }
}

class CalcInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (e) => {
    switch(this.props.inputID) {
      case 'clear':
        this.props.clearDisplay();
        break;
      case 'equals':
        this.props.equalFunc();
        break;
      default: 
        this.props.handleClick(this.props.value);
    }
    
  };
  
  render(){ 
    const { inputID, value } = this.props;
    return(
        <div id={inputID} style={{'grid-area': inputID}}>
          <button onClick={this.handleClick}>{value}</button>
        </div>
      );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));