import React from 'react';
//import {QuillBar} from './QuillBar';
import {getDocument} from '../server';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    if (typeof document !== 'undefined') {
      this.quill = require('react-quill');
      this.quillbar = require('./QuillBar.js');
    }
  }
  highlightText(e) {
    var highlightedText = document.getSelection().toString()
    if (highlightedText.length > 0) {
      this.props.getWord({word: highlightedText, category: this.props.activeCat});
    }
  }

  handleChange(event) {
    this.props.onChange(event);
  }
  //componentDidMount() {
  //    getDocument(this.props.docId, (doc) => this.setState({text: doc.text}));
  //}
  render() {
    const Quill = this.quill;
    const QuillBar = this.quillbar;
    if (Quill && QuillBar) {
      return (
        <div className="texteditor-inner-wrapper"
        onMouseUp={(e)=>this.highlightText(e)} onKeyUp={(e)=>this.highlightText(e)}>
        <QuillBar handleChange={(e) => this.handleChange(e)} value={this.props.value}/>
        </div>
      );} else return (<div>THIS IS THE SERVER RENDERED ONE</div>);
  }
}

export default TextEditor;
