// The markdown text can't include more than 3 spaces before each new line
const defualtText = `# Marked
## Marked
\`Marked\`
**marked**


\`\`\`javascript
const text = '';
\`\`\`
`;


let renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  },
});


class Marked extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      text: defualtText
    }
  }
  
  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }
  
  getMarked (){
    
    const markedText = marked(this.state.text);
    
    return {
      __html: markedText
    }
  }
  
  render() {
    return(
      <div>
        <textarea id="editor" onChange={this.handleChange} value={this.state.text} />
        <div id="preview" dangerouslySetInnerHTML={this.getMarked()}></div>
      </div>
    );
  }
}

ReactDOM.render(
  <Marked />,  document.getElementById('root')
);