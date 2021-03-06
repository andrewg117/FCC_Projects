// Original quote script with an array of quotes

// Array of quotes from:
// https://blog.hubspot.com/sales/famous-quotes Written by Meredith Hart
const quoteArr = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: 'Nelson Mandela'
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: 'Walt Disney'
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: 'Eleanor Roosevelt'
  },
  {
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  }
]

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.newQuote = this.newQuote.bind(this);
    this.state = {
      id: this.randIndex(),
    };  
  }
  
  randIndex() {
    let max = quoteArr.length - 1;
    return Math.floor(Math.random()* max);
  }
  
  newQuote() {
    this.setState({
      id: this.randIndex()
    })
  }
  
  
  
  render() {
    return (
      <div id="quote-box">
        <h1 id="text">"{quoteArr[this.state.id].text}"</h1>
        <h2 id="author">- {quoteArr[this.state.id].author}</h2>
        <div class="btn-container">
          <a 
            id="tweet-quote" 
            target="_blank" 
            href={'https://twitter.com/intent/tweet?text="' + quoteArr[this.state.id].text + '"' + '\n -' + quoteArr[this.state.id].author}>
            Tweet
          </a>
          <a id="new-quote" href="#" onClick={this.newQuote}>New Quote</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Quote />,  document.getElementById('root')
);