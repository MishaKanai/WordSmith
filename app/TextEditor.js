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
            console.log("an != fn");
            const anchorStart = selection.anchorOffset;
            const anchorEnd = anchorNode.length;

            //TODO:
            //find common parent of anchorNode and focusNode

            //http://stackoverflow.com/a/2453811
            var fp = $(focusNode).parents();
            var ap = $(anchorNode).parents();
            for (var i=0; i<ap.length; i++) {
                if (fp.index(ap[i]) != -1) {
                    // common parent
                    console.log("common parent: (?): ",fp[fp.index(ap[i])]);
                    break;
                }
            }
            const parentNode = fp[fp.index(ap[i])];
            if (parentNode.className == "ql-editor") {
                console.log("not clicked on text");
                return;
            }

            const totalEnd = anchorNode.length + selection.focusOffset;
            console.log("anchorNode:", anchorNode.cloneNode(true));
            console.log("focusNode", focusNode.cloneNode(true));

            var textAnchorToFocus = '';

            var textPre = '';
            // FILL GAPS (recursion?)
            let traverseList = (parentNode, startNode, endNode, sf, ef) => {
                if (parentNode === startNode) {
                    textAnchorToFocus += parentNode.wholeText;
                    return [new Array (parentNode), 1,0 ];
                }
                else if (parentNode === endNode) {
                    textAnchorToFocus += parentNode.wholeText;
                    return [new Array (parentNode), 1,1 ];
                }
                else if (parentNode.nodeType === Node.TEXT_NODE) {
                    if (sf && !ef) {
                        textAnchorToFocus += parentNode.wholeText;
                        return [new Array (parentNode), 1 , 0];
                    }
                    else {
                        if (!sf) {
                            textPre = textPre + parentNode.wholeText;
                        }
                        return [[], sf,ef];
                    }
                }

                /*else if (parentNode.textContent != null){
                    console.log("new");
                    if (sf && !ef) {
                        textAnchorToFocus += parentNode.textContent;
                        return [new Array (parentNode), 1 , 0];
                    }
                    else {
                        if (!sf) {
                            textPre = textPre + parentNode.textContent;
                        }
                        return [[], sf,ef];
                    }
                }*/else {
                    console.log("else!");
                    console.log("nodetype:" ,parentNode.nodeType);
                }

                //traverse list and concat
                const childNodes = parentNode.childNodes;
                console.log(childNodes);

                var returnList = [];
                for (let i = 0; i < childNodes.length; i++) {
                    let currChild = childNodes[i];
                    let result = traverseList(currChild, startNode, endNode, sf, ef)
                    sf = result[1];
                    ef = result[2];
                    returnList = returnList.concat(result[0]);
                }
                console.log(returnList);
                return [returnList, sf, ef];
            }



            var traversal = traverseList(parentNode, anchorNode, focusNode, 0, 0)[0];
            console.log("textPre:", textPre);
            console.log("textAnchorToFocus:", textAnchorToFocus);
            var textpart2 = '';
            var preFocusText = '';
            for (let i = 0; i < traversal.length; i++) {

                textpart2 += traversal[i].wholeText;
                if (i != traversal.length-1)
                    preFocusText += traversal[i].wholeText;
            }
            textpart2 = textpart2.slice(anchorStart, textpart2.length);
            console.log(textpart2);

            let combinedText = textpart2;

            console.log("combined text build through iteration:", combinedText);



//            const combinedText = anchorNode.textContent + focusNode.textContent;
            //const combinedText = //length of our anchorStart to end.
            console.log("ct2:",combinedText);

            //length of everything pre-focusNode

            word = combinedText.slice(0, preFocusText.length + selection.focusOffset);
            console.log("word:", word);

/*
            console.log("selection object:",selection);
            console.log("combinedText: ",combinedText);
            console.log("anchornode parent",anchorNode.parentNode);
            console.log("anchornode parent parent",anchorNode.parentNode.parentNode);
*/
            //TODO: tooltip target.


            var prevLengthFocusOffset = parentNode.textContent.length - preFocusText.length+selection.focusOffset;
            console.log("pntc: ",parentNode.textContent);
            var prevLengthAnchorOffset = parentNode.textContent.length - combinedText.length;

            //console.log("node: ",anchorNode.parentNode.parentNode.cloneNode(true));
            console.log("start: ", prevLengthAnchorOffset);
            console.log("end:", prevLengthFocusOffset);
            tagCrossNodeWord(parentNode, textPre.length + selection.anchorOffset, textPre.length + word.length);
            //tagCrossNodeWord(parentNode, prevLengthAnchorOffset, prevLengthFocusOffset);

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
            console.log("an == fn");

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
