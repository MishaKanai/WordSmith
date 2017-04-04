import React from 'react';

class Element extends React.Component {
  render() {
    return (
      <li className="list-group-item bottom-border-only clearfix">
      <span className="left-hand-text">{this.props.subject}</span>
      {this.props.children}
      </li>
    )
  }
}

class UpdatePwModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPwMatch: false,
      oldPwValue: "",
      newPwValid: false,
      newPwValue: "",
      newPwMatch: false,
      newPw2Value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, id) {
    let icon = null
    switch(id) {
      case "oldPwd":
        if(value === "cat") {
          this.setState({
            oldPwValue: value,
            oldPwMatch: true
          });
          icon = <span className="glyphicon glyphicon-ok-circle text-success"></span>;
          return icon;
        } else {
          this.setState({
            oldPwValue: value,
            oldPwMatch: false
          });
          icon = <span className="glyphicon glyphicon-remove-circle text-danger"></span>;
          return icon;
        }
        break;
      case "newPwd":
        if(value === "validPwd") {
          this.setState({
            newPwValue: value,
            newPwValid: true
          });
          icon = <span className="glyphicon glyphicon-ok-circle text-success"></span>;
          return icon;
        } else {
          this.setState({
            newPwValue: value,
            newPwValid: false
          });
          icon = <span className="glyphicon glyphicon-remove-circle text-danger"></span>;
          return icon;
        }
        break;
      case "newPwd2":
        if(value === this.state.newPwValue) {
          this.setState({
            newPw2Value: value,
            newPwMatch: true
          });
          icon = <span className="glyphicon glyphicon-ok-circle text-success"></span>;
          return icon;
        } else {
          this.setState({
            newPw2Value: value,
            newPwMatch: false
          });
          icon = <span className="glyphicon glyphicon-remove-circle text-danger"></span>;
          return icon;
        }
        break;
      default:
        icon = <span className="glyphicon glyphicon-record"></span>;    
        return icon;
        break;
    }
  }

  render() {
    return (
      <div>
      <ModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="oldPwd" subject="Old password" id="oldPwd" />
      <ModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd" subject="New password" id="newPwd" />
      <ModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd2" subject="Confirm new password" id="newPwd2" /> 
      </div>
    );
  }

}

class ModalElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      icon: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newIcon = null
    newIcon = this.props.modalOnChange(event.target.value, this.props.id);
    this.setState({
      value: event.target.value,
      icon: newIcon
    });
  }

  render() {

    return (
      <li className="list-group-item bottom-border-only clearfix">
      <div className="form-group">
      <label for={this.props.forLabel}>{this.props.subject}</label>
      <input type="password" className="form-control modal-pw-box pull-left" onChange={this.handleChange} id={this.props.id} />
      <span className="fake-btn pull-right">
      {this.state.icon}
      </span>
      </div>
      </li> 
    );
  }
}

class ListElements extends React.Component {
  render() {
    const elementArray = this.props.elementArray;
    const listItems = elementArray.map((element) =>
      <option>{element}</option>
    );
    return (
      <select className="pull-right" id="sel1">
      {listItems}
      </select>
    );
  }
}

class EditElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      value: this.props.value
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      enabled: !prevState.enabled    
    }));
  }

  handleChange(event) {
    this.setState({value: event.target.value});    
  }

  render() {
    return (
      <div className="right-element pull-right">
      <input type="text" className="form-control display-name pull-left" value={this.state.value} onChange={this.handleChange} disabled={this.state.enabled ? "" : "disabled"} />
      <button type="button" onClick={this.handleClick} className="btn btn-default pull-right">
      <span className={this.state.enabled ? "glyphicon glyphicon-ok text-success" : "glyphicon glyphicon-pencil"}></span>
      </button>
      </div>
    );
  }
}

export default class Settings extends React.Component {
  render() {
    return (
      <div>

      <div className="container">
      <div id="updatePassword" className="modal fade" role="dialog">

      <div className="modal-dialog pwd-box">
      <div className="modal-content">
      <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal">&times;</button>
      <h4 className="modal-title">Update password</h4>
      </div>
      <div className="modal-body">
      <ul className="list-group">
      <UpdatePwModal />
      <li className="list-group-item bottom-border-only">
      <button type="button" className="btn btn-success modal-btn" data-dismiss="modal">Update</button>
      </li>
      </ul>
      </div>
      </div>
      </div>
      </div>

      <div id="deleteAccount" className="modal fade" role="dialog">
      <div className="modal-dialog">
      <div className="modal-content">
      <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal">&times;</button>
      <h4 className="modal-title">Are you sure you want to delete your account?</h4>
      </div>
      <div className="modal-body">
      <button type="button" className="btn btn-danger modal-btn" data-dismiss="modal">Delete account</button>
      </div>
      </div>
      </div>
      </div>
      <div className="row-fluid">
      <div className="col-md-10 col-md-offset-1 white-box"></div>
      </div>
      <div className="row">
      <div className="col-md-10 col-md-offset-1">
      <ul className="list-group">
      <li className="list-group-item bottom-border-only">
      <h1 className="text-center">Settings</h1>
      </li>
      <li className="list-group-item bottom-border-only">
      <h3 className="text-center">Wordsmith editor default settings</h3>
      </li>
      <Element subject="Theme"><ListElements elementArray={['Light', 'Dark']} /></Element>
      <Element subject="Font"><ListElements elementArray={['Arial', 'Times New Roman']} /></Element>
      <Element subject="Font size"><ListElements elementArray={['10', '12', '14', '16', '18']} /></Element>
      <li className="list-group-item bottom-border-only">
      <h3 className="text-center">Account settings</h3>
      </li>
      <Element subject="Display name"><EditElement value="Kendrick Lamar" /></Element>
      <Element subject="Email"><EditElement value="klamar@tde.us" /></Element>
      <Element subject="Password">
      <button type="button" className="btn btn-default right-element pull-right" data-toggle="modal" data-target="#updatePassword">Update</button>  
      </Element>
      <li className="list-group-item bottom-border-only clearfix">
      <button type="button" className="btn btn-danger delete-btn" data-toggle="modal" data-target="#deleteAccount">
      Delete account
      </button>
      </li>
      </ul>
      </div>
      </div>
      </div>

      </div>
    )
  }
}
