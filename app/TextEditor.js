import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            word: null,
        };
    }
    closeModal() {
        this.setState({
            modalShown: false,
            word: null,
        });
    }
    rightClick(e) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        if (end - start < 2)
            return;

        e.preventDefault();
        const word = e.target.value.slice(start,end);
        this.state.word = word;
        this.setState({
            modalShown: true
        });
    }
    render() {
        return (<div>
                <textarea onContextMenu={(e) => this.rightClick(e)}>
	        Right click on any word to extract it, and see options.
	        </textarea>

                <Modal show={this.state.modalShown} onHide={() => this.closeModal()}>
                <Modal.Header closeButton>
                <Modal.Title>"{this.state.word}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                <li>Rhymes</li>
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
