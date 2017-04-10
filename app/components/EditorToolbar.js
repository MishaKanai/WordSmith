import React from 'react';


export default class EditorToolbar extends React.Component{
  render() {
    return (
      <div>
      {/* Editor Toolbar */}
      <div className="navbar navbar-default" id="docbar">
        <div className="container">
          <div className="navbar-header pull-left">
            <ul id="docbar-list" className="nav navbar-nav pull-right">
              <li className="divider-vertical"> </li>
              <li className="dropdown">
              <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                File
              </a>
                <ul className="dropdown-menu">
                  <li><a href="#">New</a></li>
                  <li><a href="#">Open</a></li>
                  <li><a href="#">Save</a></li>
                  <li><a href="#">Save As</a></li>
                  <li><a href="#">Rename</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
              <li>
              <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                  Edit
              </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Undo</a></li>
                  <li><a href="#">Redo</a></li>
                  <li><a href="#">Select All</a></li>
                  <li><a href="#">Find & Replace</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
              <li>
                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                  View
                </a>
                <ul className= "dropdown-menu">
                  <li><a href="#">Layout</a></li>
                  <li><a href="#">Screen Size</a></li>
                  <li><a href="#">Line Count</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
              <li>
                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                  Share
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Download</a></li>
                  <li><a href="#">Email</a></li>
                  <li><a href="#">Export</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
