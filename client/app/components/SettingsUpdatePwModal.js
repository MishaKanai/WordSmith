import React from 'react'
import {SettingsModalElement} from './SettingsModalElement'

export class SettingsUpdatePwModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		oldPwMatch: false,
		oldPwValue: "",
		oldPwIcon: <span className='glyphicon glyphicon-record'></span>,
		newPwValid: false,
		newPwValue: "",
		newPwIcon: <span className='glyphicon glyphicon-record'></span>,
		newPwMatch: false,
		newPw2Value: "",
		newPw2Icon: <span className='glyphicon glyphicon-record'></span>,
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
		oldPwIcon: <span className='glyphicon glyphicon-record'></span>,
		newPwValid: false,
		newPwValue: "",
		newPwIcon: <span className='glyphicon glyphicon-record'></span>,
		newPwMatch: false,
		newPw2Value: "",
		newPw2Icon: <span className='glyphicon glyphicon-record'></span>,
		updateEnabled: false
	  })
  }

  handleChange(value, id) {
    switch(id) {
      case "oldPwd":
        if(value === this.props.oldPwd) {
          this.setState({
            oldPwValue: value,
            oldPwMatch: true,
			oldPwIcon: <span className='glyphicon glyphicon-ok-circle text-success'></span>
          });
        } else {
          this.setState({
            oldPwValue: value,
            oldPwMatch: false,
			oldPwIcon: <span className='glyphicon glyphicon-remove-circle text-danger'></span>

          });
        }
        break;
      case "newPwd":
        if(value !== "" && value !== this.state.oldPwValue) {
          this.setState({
            newPwValue: value,
            newPwValid: true,
			newPwIcon: <span className='glyphicon glyphicon-ok-circle text-success'></span>
          });
        } else {
          this.setState({
            newPwValue: value,
            newPwValid: false,
			newPwIcon: <span className='glyphicon glyphicon-remove-circle text-danger'></span>
          });
        }
        break;
      case "newPwd2":
        if(value === this.state.newPwValue && this.state.newPwValid === true) {
          this.setState({
            newPw2Value: value,
            newPwMatch: true,
			newPw2Icon: <span className='glyphicon glyphicon-ok-circle text-success'></span>
          });
        } else {
          this.setState({
            newPw2Value: value,
            newPwMatch: false,
			newPw2Icon: <span className='glyphicon glyphicon-remove-circle text-danger'></span>
          });
		}
        break;
      default:
        break;
    }
  }
  
  handleClick() {
	  if(this.state.oldPwMatch === true && this.state.newPwValid === true && this.state.newPwMatch === true) {
		this.props.onChange(this.props.id, this.state.newPwValue)
	  }
	  this.resetState()
  }

  render() {
    return (
	  <div className="modal-body">
      <ul className="list-group">
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="oldPwd" subject="Old password" id="oldPwd" value={this.state.oldPwValue} icon={this.state.oldPwIcon} />
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd" subject="New password" id="newPwd" value={this.state.newPwValue} icon={this.state.newPwIcon} />
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd2" subject="Confirm new password" id="newPwd2" value={this.state.newPw2Value} icon={this.state.newPw2Icon} />
	  <li className="list-group-item bottom-border-only">
      <button type="button" className="btn btn-success modal-btn" data-dismiss="modal" onClick={this.handleClick} disabled={this.state.oldPwMatch === true && this.state.newPwValid === true && this.state.newPwMatch === true ? "" : "disabled"} >Update</button>
      </li>
	  </ul>
      </div>
    );
  }

}
