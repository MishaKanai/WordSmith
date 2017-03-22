import React from 'react';
import ReactDOM from 'react-dom';

export default class Suggestions extends React.Component{
  render(){
    return(
    <div>
    <div className="col-md-4">
    <div id="results-box" className="thin-border">
    <div className="row">
      <div className="col-md-12">
        <ul id="results-options" className="nav nav-pills">
          <li role="presentation" className="active leftMost-li">
            <a href="#"><span>
              Rhyme
            </span></a>
          </li>
          <li className="divider-vertical"></li>
          <li role="presentation">
            <a href="#">
              <span>
                Mime
              </span>
            </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation">
            <a href="#">
              <span>
                Define
              </span>
          </a></li>
          <li className="divider-vertical"></li>
          <li role="presentation" className="rightMost-li">
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
          <li className="list-group-item"  style={{"borderRadius" : "0px"}}>Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item" style={{"borderRadius" : "0px"}}>Vestibulum at eros</li>
        </ul>
      </div>
    </div>

    </div>

    </div>
    </div>
    )
  }
}
