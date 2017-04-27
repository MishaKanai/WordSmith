import React from 'react'
import ReactQuill from 'react-quill'

export class QuillBar extends React.Component {

  render() {
    var modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }, {'font': [] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link'],
        ['clean']
      ],
    }

    var formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link'
    ]

    return (
      <div>
      <ReactQuill theme="snow"
      className="texteditor-textarea"
      onContextMenu={(e)=>this.props.rightClick(e)}
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
