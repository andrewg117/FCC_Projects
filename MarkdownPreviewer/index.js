// The markdown text can't include more than 3 spaces before each new line
const defualtText = `# This is a header H1 size

## This is a header H2 size

[This is a link](https://www.freecodecamp.org/)

This is inline code \`let text = '';\`

This is block code:
\`\`\`javascript
let text = '';
text += 'hello';
\`\`\`

1. First item
   - First item
2. Second item
   - Second item
3. Third item
   - Third item

**This is bold text**

> This is a blockquote

This is an image:
![Trackstarz logo](https://yt3.ggpht.com/ytc/AAUvwngGAZPFBOkCbaUn23tK8y9Gs5wO16PHe8ugXBSheg=s900-c-k-c0x00ffffff-no-rj)
`;


let renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
  // highlight: (code, language) => {
  //   const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  //   return hljs.highlight(validLanguage, code).value;
  // },
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
      <div id="mark-container">
        <textarea id="editor" onChange={this.handleChange} value={this.state.text} />
        <div id="preview" dangerouslySetInnerHTML={this.getMarked()}></div>
      </div>
    );
  }
}

ReactDOM.render(
  <Marked />,  document.getElementById('root')
);