// The markdown text can't include more than 3 spaces before each new line
const defualtText = `# This is a header H1 size

## This is a header H2 size

[This is a link](https://codepen.io/)

This is inline code: \`let text = '';\`

This is block code:
\`\`\`javascript
let text = '';
text += 'hello';
\`\`\`

1. First item
   - First sub-item
2. Second item
   - Second sub-item
3. Third item
   - Third sub-item

**This is bold text**

> This is a blockquote
> This is a blockquote
> This is a blockquote

This is an image:
![Trackstarz logo](https://yt3.ggpht.com/ytc/AAUvwngGAZPFBOkCbaUn23tK8y9Gs5wO16PHe8ugXBSheg=s900-c-k-c0x00ffffff-no-rj)
`;

// Changes the link to open in a new tab
let renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

// Sets the options for marked
marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true
});

class Marked extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // Pass the default markdown text to the state
    this.state = {
      text: defualtText
    };
  }

  // Updates the state on user input in the textbox
  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  // Returns the html of the markdown text
  getMarked() {
    const markedText = marked(this.state.text);

    return {
      __html: markedText
    };
  }

  render() {
    return (
      <div id="mark-container">
        <textarea
          id="editor"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <div id="preview" dangerouslySetInnerHTML={this.getMarked()}></div>
      </div>
    );
  }
}

ReactDOM.render(<Marked />, document.getElementById("root"));
