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
    getWordAt(str, pos) {
        //nifty function to get the word at index pos
        //much easier this way
        //Taken and modified slightly from:
        //http://stackoverflow.com/a/5174867
        function getWordAt(str, pos) {

            // Perform type conversions.
            str = String(str);
            pos = Number(pos) >>> 0;

            // Search for the word's beginning and end.
            let left = str.slice(0, pos + 1).search(/\S+$/),
                right = str.slice(pos).search(/\s/);

            // The last word in the string is a special case.
            if (right < 0) {
                return [left, str.length];
            }

            // Return the word, using the located bounds to extract it from the string.
            return [left, right + pos];
        }

        return getWordAt(str, pos);

    }
    rightClick(e) {
        //clear highlighting and targeting
        $(".special-target").each(function() {
            $(this).replaceWith($(this).text());
        });

        //close popover
        if (this.state.popoverShown) {
            this.closePopover();
        }

        const selection = document.getSelection();
        const anchorNode = selection.anchorNode;
        const focusNode = selection.focusNode;

        var word;
        if (anchorNode !== focusNode) {
            //this is occurs when selection is across different leaves.
            //We will prepare the parameters we need to pass to tagCrossNodeWord
            // i.e. A mutual parent node to anchorNode and focusNode,
            //      And the startIndexes and endIndexes in the parent's textContent
            //      That refer to the word in questions.
            console.log("an != fn");

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
                //selection has missed text.
                //leave to default behavior
                return;
            }

            var textAccumulator = '';
            var anchorNodeHit = false;
            var focusNodeHit = false;
            var textAccumulateUntilSplit = '';

            //TODO:
            //The function below is ASYNCHRONOUS
            //this means that occasionally we get nodes appended out of order.
            //This will have to be resolved in an iterative implementation with a queue.

            // *Traverse the list recursively, getting the text nodes in-order.
            //    After reconstructing the text, we will send to tagCrossNodeWord
            // *Simultaneously accumulate textAccumulateUntilSplit until selection end
            //  so we know the index of the word to send to tagCrossNodeWord
            let traverseList = (parentNode, anchorNode, focusNode) => {
                if (parentNode === anchorNode) {
                    anchorNodeHit = true;
                    if (focusNodeHit = true)
                        textAccumulateUntilSplit +=
                        parentNode.wholeText.split(0, parentNode.anchorOffset);
                    else
                        textAccumulateUntilSplit += parentNode.wholeText;
                    textAccumulator += parentNode.wholeText;
                    return new Array (parentNode);
                }
                else if (parentNode === focusNode) {
                    focusNodeHit = true;
                    if (anchorNodeHit = true)
                        textAccumulateUntilSplit +=
                        parentNode.wholeText.split(0, parentNode.focusOffset);
                    else
                        textAccumulateUntilSplit += parentNode.wholeText;
                    textAccumulator += parentNode.wholeText;
                    return new Array (parentNode);
                }
                else if (parentNode.nodeType === Node.TEXT_NODE) {
                    if (!(anchorNodeHit && focusNodeHit))
                        textAccumulateUntilSplit += parentNode.wholeText;
                    textAccumulator += parentNode.wholeText;
                    return new Array (parentNode);
                }

                //traverse list recursively
                const childNodes = parentNode.childNodes;

                var returnList = [];
                for (let i = 0; i < childNodes.length; i++) {
                    let currChild = childNodes[i];
                    let result = traverseList(currChild, anchorNode, focusNode)
                    returnList = returnList.concat(result);
                }
                return returnList;
            }

            // generate list of textNodes
            //while filling text accumulators
            var traversal = traverseList(parentNode, anchorNode, focusNode);

            //these are important for debugging.
            console.log("textAccumulator", textAccumulator);
            console.log("TEXTACCUMULATEUNTILSPLIT", textAccumulateUntilSplit);


            let wholeText = textAccumulator;

            // tuple t
            const t =this.getWordAt(textAccumulator, textAccumulateUntilSplit.length);
            const start = t[0];
            const end = t[1];
            var word = (textAccumulator).slice(start,end);

            //good for debugging
            console.log("start index: ", start);
            console.log("end index: ", end);
            console.log("word extracted: ",word);

            //recursively insert .special-target spans into word, split across leaves
            tagCrossNodeWord(parentNode, start, end);

            //tag last .special-target with id="popover-target", for popover targeting
            const specialtargetarray = document.getElementsByClassName('special-target');
            const lasttarget = specialtargetarray.item(specialtargetarray.length -1);
            lasttarget.id = "popover-target";

            this.setState({
                target:lasttarget
            });

        } else {
            //selection is across the same leaf node.
            console.log("an == fn");

            const node = selection.anchorNode;
            const text = node.textContent;
            var start = selection.anchorOffset;
            var end = selection.focusOffset;


            word = text.slice(start,end);

            const t = this.getWordAt(text, (start + end)/ 2);
            start = t[0];
            end = t[1];
            word = text.slice(start,end);

            //insert popover target
            let popover_target = document.createElement('span');
            popover_target.id = 'popover-target';
            popover_target.className = 'special-target'
            popover_target.innerHTML = word;
            popover_target.style.color = "blue";

            let parentElem = node.parentElement;
            parentElem.replaceChild( document.createTextNode(text.slice(0, start)), node );
            parentElem.append(popover_target)
            parentElem.append(text.slice(end, text.length));

            this.setState({
                target:popover_target
            });
        }

        //trim whitespace from word.
        //necessary?
        word = word.trim().replace(/(^\W*)|(\W*$)/g, '').trim();
        //check for 1 letter words, and inner whitespace, and ignore
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
                    $(".special-target").each(function() {
                        $(this).replaceWith($(this).text());
                    });
                }}>Close</Button>
            </Popover>
                </Overlay>
                </div>
        );
    }
}

export default TextEditor;
