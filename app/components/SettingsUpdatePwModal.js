import React from 'react'
import {SettingsModalElement} from './SettingsModalElement'

export class SettingsUpdatePwModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPwMatch: false,
      oldPwValue: "",
      newPwValid: false,
      newPwValue: "",
      newPwMatch: false,
      newPw2Value: "",
	  updateEnabled: false
    }

    this.handleChange = this.handleChange.bind(this)
	this.handleClick = this.handleClick.bind(this)
	this.resetState = this.resetState.bind(this)
  }
  
  resetState() {
	  this.setState({
		oldPwMatch: false,
		oldPwValue: "",
		newPwValid: false,
		newPwValue: "",
		newPwMatch: false,
		newPw2Value: "",
		updateEnabled: false
	  })
  }

  handleChange(value, id) {
    let icon = null
    switch(id) {
      case "oldPwd":
        if(value === this.props.oldPwd) {
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
        if(value !== "" && value !== this.state.oldPwValue) {
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
        if(value === this.state.newPwValue && this.state.newPwValid === true) {
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
	if(this.state.oldPwMatch === true && this.state.newPwValid === true && this.state.newPwMatch === true) {
		this.setState({updateEnabled: true})
	}
  }
  
  handleClick() {
	  if(this.state.oldPwMatch === true && this.state.newPwValid === true && this.state.newPwMatch === true) {
		this.props.onChange(this.props.id, newPwValue)
	  }
	  resetState()
  }

  render() {
    return (
	  <div className="modal-body">
2     <ul className="list-group">
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="oldPwd" subject="Old password" id="oldPwd" />
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd" subject="New password" id="newPwd" />
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd2" subject="Confirm new password" id="newPwd2" />
	  <li className="list-group-item bottom-border-only">
2     <button type="button" className="btn btn-success modal-btn" data-dismiss="modal" onClick={this.handleClick} disabled={this.state.updateEnabled ? "" : "disabled"} >Update</button>
2     </li>
	  </ul>
      </div>
    );
  }

}
