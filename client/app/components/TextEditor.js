import React from 'react';
import ReactQuill from 'react-quill';
import { Overlay, Popover, Button } from 'react-bootstrap';
import insertTargets from '../js/applyClassesToWord';
import {getDocument} from '../server';

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverShown: false,
            word: null
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


    }
    rightClick(e) {
        //close popover
        if (this.state.popoverShown) {
            this.closePopover();
        }
        //t is a tuple: [word selected, popover-target element]
        var t = insertTargets(document.getSelection());

        if (t != null) {
            //success
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if (document.selection) {  // IE?
                document.selection.empty();
            }
            e.preventDefault();

            this.state.word = t[0];
            this.setState({
                target:t[1],
                popoverShown: t[1],
            });
        }
    }
    handleChange(event) {
        this.props.onChange(event);
    }
    //componentDidMount() {
    //    getDocument(this.props.docId, (doc) => this.setState({text: doc.text}));
    //}
    render() {
        return (
                <div className="texteditor-inner-wrapper"
            onContextMenu={(e)=>this.rightClick(e)}>
                <ReactQuill
            className="texteditor-textarea"
            onContextMenu={(e)=>this.rightClick(e)}
            onChange={(e)=>this.handleChange(e)}
            value={this.props.value}
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
                <Button className="list-group-item" onClick={(e) => {
                    const target_parent = this.state.target_parent;
                    const target = this.state.target;
                    this.closePopover();
                    $(".special-target").each(function() {
                        $(this).replaceWith($(this).text());
                    });
                    //this.props.getCategory("rhyme");
                    this.props.getWord({word: this.state.word, category: "rhyme"});
                  }}>Rhymes</Button>
                <Button className="list-group-item" onClick={(e) => {
                  const target_parent = this.state.target_parent;
                  const target = this.state.target;
                  this.closePopover();
                  $(".special-target").each(function() {
                      $(this).replaceWith($(this).text());
                  });
                  this.props.getWord({word: this.state.word, category: "synonym"});
                  }}>Thesaurus</Button>
                <Button className="list-group-item" onClick={(e) => {
                  const target_parent = this.state.target_parent;
                  const target = this.state.target;
                  this.closePopover();
                  $(".special-target").each(function() {
                      $(this).replaceWith($(this).text());
                  });
                  this.props.getWord({word: this.state.word, category: "definition"});
                  }}>Dictionary</Button>
                <Button className="list-group-item" onClick={(e) => {
                  const target_parent = this.state.target_parent;
                  const target = this.state.target;
                  this.closePopover();
                  $(".special-target").each(function() {
                      $(this).replaceWith($(this).text());
                  });
                  this.props.getWord({word: this.state.word, category: "slang"});
                  }}>UrbanDictionary</Button>
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