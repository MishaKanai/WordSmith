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
          <li role="presentation" className={this.props.active === "rhyme" ? "active leftMost-li" : "leftMost-li"}>
            <a href="#"><span>
              Rhyme
            </span></a>
          </li>
          <li className="divider-vertical"></li>
          <li role="presentation" className = {this.props.active === "mime" ? "active" : ""}>
            <a href="#">
              <span>
                Mime
              </span>
            </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" className = {this.props.active === "define" ? "active" : ""}>
            <a href="#">
              <span>
                Define
              </span>
          </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" className={this.props.active === "slance" ? "active rightMost-li" : "rightMost-li"}>
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
          <h4>&ldquo;sweaty&rdquo;</h4>
        </div>
      </div>
    </div>
    <div className="row" >
      <div className="col-md-12" >
        <ul className="list-group">
          {this.props.allSuggestions.map(n => <Suggestion word={n} />)}
        </ul>
      </div>
    </div>

    </div>

    </div>
    </div>
    )
  }
}
