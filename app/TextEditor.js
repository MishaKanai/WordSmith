import React from 'react';
import ReactQuill from 'react-quill';
import { Modal, Button } from 'react-bootstrap';
import { loremipsum } from './LoremIpsum';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            word: null,
            text: loremipsum
        };
    }
    closeModal() {
        this.setState({
            modalShown: false,
            word: null,
        });
    }
    rightClick(e) {
        const selection = document.getSelection();
        const anchorNode = selection.anchorNode;
        const focusNode = selection.focusNode;

        var word;
        if (anchorNode !== focusNode) {

            const anchorStart = selection.anchorOffset;
            const anchorEnd = anchorNode.length;

            const totalEnd = anchorNode.length + selection.focusOffset;
            const combinedNode = anchorNode.textContent + focusNode.textContent;

            word = combinedNode.slice(anchorStart, totalEnd);

        } else {

            const node = selection.anchorNode;
            const start = selection.anchorOffset;
            const end = selection.focusOffset;
            word = node.textContent.slice(start,end);
        }
        word = word.trim().replace(/(^\W*)|(\W*$)/g, '').trim();
        if (word.length < 2 || word.split(' ').length > 1) {
            //do nothing
            return;
        } else e.preventDefault();

        this.state.word = word;
        this.setState({
            modalShown: true
        });
    }
    handleChange(event) {
        this.setState({text: event});
    }

    render() {
        return (
                <div className="texteditor-inner-wrapper"
            onContextMenu={(e)=>this.rightClick(e)}>
                <ReactQuill
            className="texteditor-textarea"
            onContextMenu={(e)=>this.rightClick(e)}
            onChange={(e)=>this.handleChange(e)}
            value={this.state.text}
                />


                <Modal show={this.state.modalShown} onHide={() => this.closeModal()}>
                <Modal.Header closeButton>
                <Modal.Title>"{this.state.word}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                <li><Button onClick={
                    ()=>{
                        this.props.getRhymes(this.state.word);
                        this.closeModal()
                    }
                }>Rhymes</Button></li>
                <li>Dictionary</li>
                <li>Thesaurus</li>
                <li>Urban Dictionary</li>
                </ul>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={(e) => this.closeModal()}>Close</Button>
                </Modal.Footer>
                </Modal>
                </div>
        );
    }
}

export default TextEditor;
