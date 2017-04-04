import React from 'react';
import Suggestion from './Suggestion';

export default class SuggestionsBar extends React.Component{
  render(){
    return(
    <div>
    <div className="col-md-4">
    <div id="results-box" className="thin-border">
    <div className="row">
      <div className="col-md-12">
        <ul id="results-options" className="nav nav-pills">
          <li role="presentation" onClick={(e) => {this.props.updateCategory("rhyme")}} className={this.props.active === "rhyme" ? "active leftMost-li" : "leftMost-li"}>
            <a href="#"><span>
              Rhymes
            </span></a>
          </li>
          <li className="divider-vertical"></li>
          <li role="presentation" onClick={(e) => {this.props.updateCategory("synonym")}} className = {this.props.active === "synonym" ? "active" : ""}>
            <a href="#">
              <span>
                Synonyms
              </span>
            </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" onClick={(e) => {this.props.updateCategory("definition")}} className = {this.props.active === "definition" ? "active" : ""}>
            <a href="#">
              <span>
                Definitions
              </span>
          </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" onClick={(e) => {this.props.updateCategory("slang")}} className={this.props.active === "slang" ? "active rightMost-li" : "rightMost-li"}>
            <a href="#">
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
        <ul className="list-group">
          {this.props.allSuggestions.map(n => <Suggestion key={Math.floor(Math.random()*1000)} word={n} />)}
        </ul>
      </div>
    </div>

    </div>

    </div>
    </div>
    )
  }
}
