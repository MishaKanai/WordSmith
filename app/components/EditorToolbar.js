import React from 'react';
import ReactDOM from 'react-dom';

class EditorToolbar extends React.Component
{
  render()
  {
    return(
      <div>
      <div className="navbar navbar-default" id="docbar">
        <div className="container">
          <div className="navbar-header pull-left">
            <ul id="docbar-list" className="nav navbar-nav pull-right">
              <li className="divider-vertical"> </li>
              <li><a href="#">File<span className="sr-only">(current)</span></a></li>
              <li className="divider-vertical"> </li>
              <li><a href="#">Edit<span className="sr-only">(current)</span></a></li>
              <li className="divider-vertical"> </li>
              <li><a href="#">View<span className="sr-only">(current)</span></a></li>
              <li className="divider-vertical"> </li>
              <li><a href="#">Share<span className="sr-only">(current)</span></a></li>
              <li className="divider-vertical"> </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

ReactDOM.render
(
  <EditorToolbar />, document.getElementById('docbar')
);
