import React from 'react';
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
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        //default behavior for single character selections
        if (end - start < 2)
            return;

        e.preventDefault();
        const word = e.target.value.slice(start,end);
        this.state.word = word;
        this.setState({
            modalShown: true
        });
    }
    handleChange(event) {
        this.setState({text: event.target.value});
    }
    render() {
        return (<div className="texteditor-inner-wrapper">
                <textarea
                className="texteditor-textarea"
                value={this.state.text}
                onContextMenu={(e) => this.rightClick(e)}
                onChange={(e)=>this.handleChange(e)}
                >
	        </textarea>

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
