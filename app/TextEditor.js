import React from 'react';
import ReactQuill from 'react-quill';
import { Overlay, Popover, Button } from 'react-bootstrap';
import { loremipsum } from './LoremIpsum';
import tagCrossNodeWord from './applyClassesToWord';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverShown: false,
            word: null,
            text: loremipsum
        };
    }
    closePopover() {
        this.setState({
            target: null,
            popoverShown: false,
            word: null,
        });
    }
    replaceWithChild(target_parent, target) {
        target_parent.replaceChild(this.state.target.firstChild,this.state.target);
    }
    rightClick(e) {
        if (this.state.popoverShown) {
            this.closePopover();
            this.replaceWithChild(this.state.target_parent, this.state.target);
        }
        const selection = document.getSelection();
        const anchorNode = selection.anchorNode;
        const focusNode = selection.focusNode;

        var word;
        if (anchorNode !== focusNode) {

            const anchorStart = selection.anchorOffset;
            const anchorEnd = anchorNode.length;

            const totalEnd = anchorNode.length + selection.focusOffset;
            const combinedText = anchorNode.textContent + focusNode.textContent;

            word = combinedText.slice(anchorStart, totalEnd);

            //TODO: tooltip target.

            tagCrossNodeWord(anchorNode.parentNode, anchorStart, totalEnd);

/*
            let popover_target = document.createElement('span');
            popover_target.id = 'popover-target';
            popover_target.innerHTML = focusNode.textContent.slice(0, selection.focusOffset);
            popover_target.style.color = "blue";

            //anchorNode only
            //anchorNode.parentElement.innerHTML =

            //focusNode.parentElement.
            let parentElem = focusNode.parentElement;
            let parentNode = focusNode.parentNode;

            parentNode.removeChild(parentNode.firstChild);
            console.log(parentElem);
            console.log(parentElem.firstChild);
            parentElem.append(popover_target);
            parentElem.append(combinedText.slice(totalEnd, combinedText.length));
*/



        } else {

            const node = selection.anchorNode;
            const start = selection.anchorOffset;
            const end = selection.focusOffset;
            const text = node.textContent;
            word = text.slice(start,end);

            let popover_target = document.createElement('span');
            popover_target.id = 'popover-target';
            popover_target.innerHTML = text.slice(start,end);
            popover_target.style.color = "blue";

            let parentElem = node.parentElement;
            parentElem.innerHTML = (text.slice(0, start));
            parentElem.append(popover_target)
            parentElem.append(text.slice(end, text.length));

            this.setState({
                target_parent: popover_target.parentNode,
                target:popover_target
            });
        }
        word = word.trim().replace(/(^\W*)|(\W*$)/g, '').trim();
        if (word.length < 2 || word.split(' ').length > 1) {
            //do nothing
            return;
        } else e.preventDefault();

        this.state.word = word;
        this.setState({
            popoverShown: true,
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
                <Overlay
            show={this.state.popoverShown}
            target={this.state.target}
            placement='right'
            container={this}
            containerPadding={20}
                >
                <Popover id="popover-contained" title={this.state.word}>
                <ul>
                <Button className="list-group-item">Rhymes</Button>
                <Button className="list-group-item">Thesaurus</Button>
                <Button className="list-group-item">Dictionary</Button>
                <Button className="list-group-item">UrbanDictionary</Button>
                </ul>
                <Button id="close-popover" className="pull-right" onClick={(e) => {
                    const target_parent = this.state.target_parent;
                    const target = this.state.target;
                    this.closePopover();
                    this.replaceWithChild(target_parent, target);
                }}>Close</Button>
            </Popover>
                </Overlay>
                </div>
        );
    }
}

export default TextEditor;
