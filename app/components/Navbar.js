import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">WordSmith</a>
        </div>


        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="divider-vertical"></li>
            <li><a href="#">My Docs <span className="sr-only">(current)</span></a></li>
            <li className="divider-vertical"></li>
          </ul>
          <form className="navbar-form navbar-left">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" list="searchResults">
              <datalist id="searchResults">
                <option value="untitled"></option>
                <option value="untitled 2"></option>
                <option value="Lose Yourself"></option>
                <option value="Dear Stan"></option>
                <option value="Haiku"></option>
                <option value="Poem for GF"></option>
              </datalist>
              <span className="input-group-btn"><button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button></span></input>
            </div>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Home</a></li>
            <li className="divider-vertical"></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Kendrick Lamar <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Settings</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
                </nav>
        );
    }

}
