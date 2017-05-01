import React from 'react';
import TextEditor from './TextEditor';
import SuggestionsBar from './SuggestionsBar';
import {putDocument, getDocument} from '../server';
class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //we will store info returned from api here.
            title: "...",
            info: [],
            category:"rhyme",
            word:"",
            text: "...",
            justSaved: true
        }
        this.firstTextChange = true;

      this.handleTitleChange = this.handleTitleChange.bind(this)
      this.updateTitle = this.updateTitle.bind(this)
    }
    getRhymes(word) {
        $.ajax({
            url: this.props.rhymeAPIprefix + word,
            dataType: 'json',
            cache: true,
            success: function(data) {
                //this.setState({info: JSON.stringify(data)});
                this.setState({info: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    getSuggestions(word, category){
      var api = ""
      switch(category){
        case "rhyme":
          api = this.props.rhymeAPIprefix;
          break;
        case "synonym":
          api = this.props.synonymAPIprefix;
          break;
        case "slang":
          break;
        case "definition":
          api = this.props.definitionAPIprefix
          break;
        default:
          break;
      }
      $.ajax({
          url: api + word,
          dataType: 'json',
          cache: true,
          success: function(data) {
              //this.setState({info: JSON.stringify(data)});

              if(category === "definition"){
                if(!data[0].hasOwnProperty('defs')){
                  data = ["asdf\\tN/A"]
                }else{
                  data = data[0].defs
                }
              }
              this.setState({info: data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    }
    getCategory(cat) {
      var currentCat = this.state.category
      this.setState({category:cat})
      switch(cat){
        case "rhyme":
          if(this.state.info.length != 0 && currentCat != "rhyme"){
            this.getRhymes(this.state.word)
          }
          break;
        case "synonym":
          if(this.state.info.length != 0 && currentCat != "synonym"){
            this.getSuggestions(this.state.word, "synonym")
          }
          break;
        case "definition":
          if(this.state.info.length != 0 && currentCat != "definition"){
            this.getSuggestions(this.state.word, "definition")
          }
          break;
        case "slang":
          if(this.state.info.length != 0 && currentCat != "slang"){
            this.getSuggestions(this.state.word, "slang")
          }
          break;
        }
    }

    getWord(tuple) {
      var w = tuple.word;
      var cat = tuple.category;
      this.setState({word:w, category:cat})
      this.getSuggestions(w, cat);
    }
    componentDidMount() {
        getDocument(this.props.docId, (doc) => this.setState({
            title: doc.title,
            text: doc.text,
            lastSaved: doc.timestamp,
        }));
    }
    handleChange(event) {
        //unsure justSaved is set correctly on first handleChange.
        if (this.firstTextChange) {
            this.setState({text: event, justSaved: true});
            this.firstTextChange = false;
        }
        else
            this.setState({text: event, justSaved: false});
    }

  handleTitleChange(event) {
    if (this.refs.title.innerHTML.length >= 26) {
      if (!(window.getSelection().toString().length > 0) || !(this.refs.title.isSameNode(window.getSelection().getRangeAt(0).startContainer.parentNode))) {
        if (event.which != 8 && event.which != 46) {
          event.preventDefault()
        }
      }
    } else {
      this.setState({justSaved: false});
      if (event.which == 13) {
        event.preventDefault()
        event.target.blur()
      }
    }
  }

  updateTitle(event) {
    this.setState({title: this.refs.title.innerHTML});
  }

    saveDoc() {
        const docId = this.props.docId;
        const title = this.state.title;
        const text = this.state.text;
        const now = Date.now();
        putDocument(docId, title, text, now, () => {
            //TODO:
            //grey out save button until next handleChange
            this.setState({
                justSaved: true,
                lastSaved: now
            });
        });
    }

    render() {
        return (<div className='workspace-inner-wrapper container'>

                <row>

                <div className='col-md-8 leftcol'>
                <row>

                <h3 id="doc-title" ref="title" onBlur={this.updateTitle} onKeyPress={this.handleTitleChange} contentEditable="true">{" "+this.state.title}</h3>

                {this.state.justSaved ? <span id='lastsavedtxt'>{'last saved: '} {new Date(this.state.lastSaved).toLocaleString()}</span>:
                 <span id='saveBtn' onClick={() => this.saveDoc()} className='btn'>save</span>}
                </row>
                <TextEditor
                    docId={this.props.docId}
                    value={this.state.text}
                    onChange={(e) => this.handleChange(e)}
                    getRhymes={(word)=>this.getRhymes(word)}
                    getCategory={(x) => this.getCategory(x)}
                    activeCat={this.state.category}
                    getWord={(x) => this.getWord(x)}
                />
                </div>
                <SuggestionsBar
                    word={this.state.word}
                    active={this.state.category}
                    updateCategory={(x) => this.getCategory(x)}
                    allSuggestions={this.state.category==="definition" ?
                      this.state.info.map((x) => JSON.stringify(x).split("\\t")[1].slice(0,-1)) :
                      this.state.info.map((x) => x.word)}
                />

                </row>

                </div>)
    }
}

export default Workspace;
