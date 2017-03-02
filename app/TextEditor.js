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
    rightClick(e) {

        $(".special-target").each(function() {
            $(this).replaceWith($(this).text());
        });

        if (this.state.popoverShown) {
            this.closePopover();
            //this.replaceWithChild(this.state.target_parent, this.state.target);
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

            var textAccumulator = '';
            var textPre = '';
            // FILL GAPS (recursion?)
            let traverseList = (parentNode, startNode, endNode, sf, ef) => {
                if (parentNode === startNode) {
                    textAccumulator += parentNode.wholeText;

                    textAnchorToFocus += parentNode.wholeText;
                    return [new Array (parentNode), 1,0 ];
                }
                else if (parentNode === endNode) {
                    textAccumulator += parentNode.wholeText;

                    textAnchorToFocus += parentNode.wholeText;
                    return [new Array (parentNode), 1,1 ];
                }
                else if (parentNode.nodeType === Node.TEXT_NODE) {
                    textAccumulator += parentNode.wholeText;

                    console.log("X": parentNode);
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
                else {
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
            console.log("textAccumulator", textAccumulator);



            var textpart2 = '';
            var preFocusText = '';
            for (let i = 0; i < traversal.length; i++) {
                console.log("line ", i);
                console.log("text: ", traversal[i].wholeText);
                textpart2 += traversal[i].wholeText;
                if (i != traversal.length-1)
                    preFocusText += traversal[i].wholeText;
            }
            let wholeText = textpart2;
            console.log(wholeText);
            textpart2 = textpart2.slice(anchorStart, textpart2.length);
            console.log(textpart2);

//INSERT
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
            console.log("textpart2", textpart2);
            console.log("string searched by getWordAt", textPre + textAnchorToFocus);
            console.log("index: ", preFocusText.length + selection.focusOffset);
            const untilWord = textPre + textAnchorToFocus.slice(0, selection.anchorOffset) + textpart2

            const t =getWordAt(untilWord, preFocusText.length + selection.focusOffset);
            const start = t[0];
            const end = t[1];
            var word = (textPre + textAnchorToFocus).slice(start,end);
            console.log("and start: ", start);
            console.log("reulting end: ", end);
            console.log("word ",word);


            tagCrossNodeWord(parentNode, start, end);

            const specialtargetarray = document.getElementsByClassName('special-target');
            const lasttarget = specialtargetarray.item(specialtargetarray.length -1);
            lasttarget.id = "popover-target";

            this.setState({
                target:lasttarget
            });


        } else {
            console.log("an == fn");

            const node = selection.anchorNode;
            var start = selection.anchorOffset;
            var end = selection.focusOffset;
            const text = node.textContent;
            console.log(text);
            word = text.slice(start,end);


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
            const t =getWordAt(text, (start + end)/ 2);
            start = t[0];
            end = t[1];
            word = text.slice(start,end);

            console.log(word);
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
