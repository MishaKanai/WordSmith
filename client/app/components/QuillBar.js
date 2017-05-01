import React from 'react'
import ReactQuill from 'react-quill'

export class QuillBar extends React.Component {

  render() {
    var modules = {
      toolbar: [
        [{ 'size': [] }, {'font': [] }],
        ['bold', 'italic', 'underline','strike'],
        [{'indent': '-1'}, {'indent': '+1'}],
        ['link'],
        ['clean']
      ],
    }

    var formats = [
      'size', 'font',
      'bold', 'italic', 'underline', 'strike',
      'indent',
      'link'
    ]

    return (
      <div>
      <ReactQuill theme="snow"
      className="texteditor-textarea"
      onChange={(e)=>this.props.handleChange(e)}
      value={this.props.value}
      modules={modules}
      formats={formats}>
      </ReactQuill>
      </div>
    );
  }

}
module.exports = QuillBar;
