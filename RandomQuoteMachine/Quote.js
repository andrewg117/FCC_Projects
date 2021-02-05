
class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.newQuote = this.newQuote.bind(this);
    this.state = {
      id: 0,
      quotes: {},
      isLoaded: false
    };  
  }
  
  // Finds the random index based off the number of quotes
  randIndex = (max) => {
    return Math.floor(Math.random()* max);
  }
  
  // Sets the state of the new index after clicking the new-quote link
  newQuote() {
    this.setState({
      id: this.randIndex(this.state.quotes.length)
    })
  }
  
  
  componentDidMount() {
    // Fetching quote api data from:
    // Free API - Inspirational quotes JSON with code examples
    // https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373
    // by user: SergeyWebPro
    fetch('https://type.fit/api/quotes')
      .then(res => {
        // Checking the response from api then converting to json when successful
        if(res.ok){
          return res.json();
        } else {
          console.log("Failed Response");
        }
      })
      .then(data => {
          // Find initial random index
          let randInd = this.randIndex(data.length);
          // Pass json data to the quotes state
          this.setState({
            id: randInd,
            quotes: data,
            isLoaded: true
          })
      });
  }
  
  render() {
    const {quotes, id, isLoaded} = this.state;
    
    // Waits till the api fetch is completed
    if (isLoaded == false){
      return <div>Loading..</div>;
    } 
    
    let author = '';
    let quote = quotes[id].text;
    
    // Assigns Unknown author if the author value is null
    if (quotes[id].author == null){
      author = 'Unknown';
    } else {
      author = quotes[id].author;
    }
    
    // Returns after isLoaded is true
    return (
      <div id="quote-box">
        <h1 id="text">"{quote}"</h1>
        <h2 id="author">- {author}</h2>
        <div class="btn-container">
          <a 
            id="tweet-quote" 
            target="_blank" 
            href={'https://twitter.com/intent/tweet?text="' + quote + '"' + '\n -' + author}>
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