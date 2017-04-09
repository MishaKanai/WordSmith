import React from 'react'

export class SettingsModalElement extends React.Component {
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
