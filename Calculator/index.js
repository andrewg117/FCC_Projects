class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div id="calcFrame">
        <section id="displayBox">
          <h1 id="display">0</h1>
        </section>
        <section id="inputContainer">
          <div id="clear"><button>Clear</button></div>
          <div id="divide"><button>/</button></div>
          <div id="multiply"><button>*</button></div>
          <div id="subtract"><button>-</button></div>
          <div id="add"><button>+</button></div>
          <div id="equals"><button>=</button></div>
          <div id="nine"><button>9</button></div>
          <div id="eight"><button>8</button></div>
          <div id="seven"><button>7</button></div>
          <div id="six"><button>6</button></div>
          <div id="five"><button>5</button></div>
          <div id="four"><button>4</button></div>
          <div id="three"><button>3</button></div>
          <div id="two"><button>2</button></div>
          <div id="one"><button>1</button></div>
          <div id="decimal"><button>.</button></div>
          <div id="zero"><button>0</button></div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));