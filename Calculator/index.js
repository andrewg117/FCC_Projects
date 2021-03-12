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
    this.getOp = this.getOp.bind(this);
    this.getDecimal = this.getDecimal.bind(this);
    this.state = {
      displayText: '0',
      // resultEntered: false, // replace = result with new input
      lastOp: '',
      decIsUsed: false,
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
      displayText: val,
      lastOp: ''
    });
  }
  
  clearDisplay() {
    this.setState({
      displayText: '0',
      lastOp: '',
      decIsUsed: false
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
    if(this.state.lastOp == ''){
    this.setState({
      displayText: this.equateInput(this.state.displayText),
      result: this.equateInput(this.state.displayText)
    });
    }
  }
  
  getOp(Op) {
    // console.log(this.state.lastOp);
    let newText = '';
    
     if(this.state.lastOp == ''){
      newText = this.state.displayText.concat(Op);
    } else if (this.state.lastOp != '' && Op == '-' && this.state.lastOp != '-') {
      newText = this.state.displayText.concat(Op);
    } else if(this.state.lastOp != '-') {
      newText = this.state.displayText.replace(/.$/,Op);
    } else {
      newText = this.state.displayText.replace(/[^\d].$/g,Op);
    }
    this.setState({
      lastOp: Op,
      displayText: newText,
      decIsUsed: false
    });
  }
  
  getDecimal(dec) {
    // console.log(dec);
    let newText = this.state.displayText;
    if(!this.state.decIsUsed){
      newText = this.state.displayText.concat(dec);
    }
    //  if(this.state.lastOp == ''){
    //   newText = this.state.displayText.concat(dec);
    // }
    this.setState({
      displayText: newText,
      decIsUsed: true
    });
    
    
  }
  
  componentDidMount() {
    this.setState({
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
          resultVal={input.resultVal}
          lastOp={input.lastOp}
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
    let oper = '';
    if (/[^\d.=]/.test(this.props.value)){
      oper = this.props.inputID;
    }
    
    switch(this.props.inputID) {
      case 'clear':
        this.props.clearDisplay();
        break;
      case oper:
        this.props.getOp(this.props.value);
        break;
      case 'decimal':
        this.props.getDecimal(this.props.value);
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
        <div style={{'grid-area': inputID}}>
          <button  id={inputID} onClick={this.handleClick}>{value}</button>
        </div>
      );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));