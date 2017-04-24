import React from 'react';
import Suggestion from './Suggestion';

export default class SuggestionsBar extends React.Component{
  handleClick(e, cat){
    e.preventDefault();
    this.props.updateCategory(cat)
  }

  render(){
    return(
    <div>
    <div className="col-md-4">
    <div id="results-box" className="thin-border">
    <div className="row">
      <div className="col-md-12">
        <ul id="results-options" className="nav nav-pills">
          <li role="presentation" className={this.props.active === "rhyme" ? "active leftMost-li" : "leftMost-li"}>
            <a href="#" onClick={(e) => {this.handleClick(e,"rhyme")}}><span>
              Rhymes
            </span></a>
          </li>
          <li className="divider-vertical"></li>
          <li role="presentation" className = {this.props.active === "synonym" ? "active" : ""}>
            <a href="#" onClick={(e) => {this.handleClick(e,"synonym")}}>
              <span>
                Synonyms
              </span>
            </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" className = {this.props.active === "definition" ? "active" : ""}>
            <a href="#" onClick={(e) => {this.handleClick(e,"definition")}}>
              <span>
                Definitions
              </span>
          </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" className={this.props.active === "slang" ? "active rightMost-li" : "rightMost-li"}>
            <a href="#" onClick={(e) => this.handleClick(e,"slang")}>
              <span>
                Slang
              </span>
            </a></li>
        </ul>
      </div>
    </div>
    <div className="row">
      <div  className="col-md-12">
        <div id="selected-result" className="nav">
          <h4>&ldquo;{this.props.word}&rdquo;</h4>
        </div>
      </div>
    </div>
    <div className="row" >
      <div className="col-md-12" >
        <ul className="list-group" id="results-scroll">
          {this.props.allSuggestions.map((n,i) => <Suggestion key={i} word={n} />)}
        </ul>
      </div>
    </div>

    </div>

    </div>
    </div>
    )
  }
}
