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
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="oldPwd" subject="Old password" id="oldPwd" />
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd" subject="New password" id="newPwd" />
      <SettingsModalElement modalOnChange={(value, id) => this.handleChange(value, id)} forLabel="newPwd2" subject="Confirm new password" id="newPwd2" /> 
      </div>
    );
  }

}
