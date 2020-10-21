import React from "react";
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    const placeholder = 
    `# Hello and welcome to my markdown reviewer!
   ## here is some sub-heading..
   ### And some more stuff! 

   Well, I can make a link to my [GitHub](http://github.com) so you can _check it out_.

   Heres some code, \`<div></div>\`, between 2 backticks.

   \`\`\`
   // this is multi-line code:
   
   function anotherExample(firstLine, lastLine) {
     if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
       return multiLineCode;
     }
   }
   \`\`\`
    
   I can do some
   > Block Quotes!
   Or even do some **bold** text within it!

   So,what else?

   How about some lists?
   - Well, here you go.
    - Yeah, just making **that** list. Look at those dots!
      - You know I can do it.

Let's not forget about kittens!

  ![Cat Image](https://images.theconversation.com/files/182925/original/file-20170822-30538-gebk45.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)
    `;

    this.state = {
      editorText: placeholder,
      previewText: "",
      previewResizeClicked: true,
      editorResizeClicked:true
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorSize= this.handleEditorSize.bind(this);
    this.handlePreviewSize= this.handlePreviewSize.bind(this);
  }
  handleChange(e) {
    this.setState(
     { editorText: e.target.value,
      previewText:"'" + this.state.editorText + "'"
    }
    );
  }
  handleEditorSize() {
    if(this.state.previewResizeClicked) {
    this.setState({
      editorResizeClicked: !this.state.editorResizeClicked
    
    });
  }
    console.log(this.state.editorResizeClicked)
    console.log(this.state.previewResizeClicked)
    let editor = document.getElementById("editor-holder");
    let preview = document.getElementById("preview-holder");

  if(this.state.editorResizeClicked && this.state.previewResizeClicked) {
    editor.style.gridColumn = "2/4";
    editor.style.gridRow="1/2";
    preview.style.gridColumn = "2/4";
    preview.style.gridRow ="2/3";
    editor.style.gridTemplateRows="min-content auto";
    preview.style.gridTemplateRows="min-content auto";
    preview.style.height="600px";
    editor.style.height="600px";
  }
  else if(!this.state.editorResizeClicked && this.state.previewResizeClicked) {
    editor.style.gridColumn = "2/3";
    preview.style.gridColumn = "3/4";
    preview.style.gridRow ="1/2";
    editor.style.height="100%";
    editor.style.gridTemplateRows="min-content 43%";
    preview.style.gridTemplateRows="min-content 43%";
    preview.style.height="100%";
  }
    }
  handlePreviewSize() {
    if(this.state.editorResizeClicked) {
    this.setState({
      previewResizeClicked: !this.state.previewResizeClicked
    });
  }
    let editor = document.getElementById("editor-holder");
    let preview = document.getElementById("preview-holder");

    if(this.state.previewResizeClicked && this.state.editorResizeClicked) {
      editor.style.gridColumn = "2/4";
      preview.style.gridColumn = "2/4";
      preview.style.gridRow="1/2";
      editor.style.gridRow ="2/3";
      editor.style.gridTemplateRows="min-content auto";
      preview.style.gridTemplateRows="min-content auto";
      preview.style.height="600px";
      editor.style.height="600px";
    }
    else if(!this.state.previewResizeClicked && this.state.editorResizeClicked){
      editor.style.gridColumn = "2/3";
      preview.style.gridColumn = "3/4";
      editor.style.gridRow ="1/2";
      editor.style.height="100%";
      editor.style.gridTemplateRows="min-content 43%";
      preview.style.gridTemplateRows="min-content 43%";
      preview.style.height="100%";

    }
  }

 

  render() {
    const marked = require('marked'); 
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
      return `<a target="_blank" href="${href}">${text}` + '</a>';
    }
    marked.setOptions({
      breaks:true
    });
      
   
  return ( 
    <div id="container">
      <div id="editor-holder">
        <div id="editor-header">Editor
      <i className="fa fa-arrows-alt" aria-hidden="true" onClick={this.handleEditorSize}></i></div>
  <textarea id ="editor" onChange={this.handleChange} >{this.state.editorText}</textarea>
  </div>
  <div id="preview-holder">
  <div id="preview-header">Preview
  <i className="fa fa-arrows-alt" aria-hidden="true" onClick={this.handlePreviewSize}></i></div>
  <div id = "preview" dangerouslySetInnerHTML={{__html: marked(this.state.editorText,{renderer:renderer})}}></div>
    </div>
    </div>
  )
}

}
  
export default App;
