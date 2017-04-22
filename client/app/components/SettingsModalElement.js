import React from 'react'

export class SettingsModalElement extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.modalOnChange(event.target.value, this.props.id);
  }

  render() {

    return (
      <li className="list-group-item bottom-border-only clearfix">
      <div className="form-group">
      <label for={this.props.forLabel}>{this.props.subject}</label>
      <input type="password" className="form-control modal-pw-box pull-left" onChange={this.handleChange} id={this.props.id} value={this.props.value} />
      <span className="fake-btn pull-right">
      {this.props.icon}
      </span>
      </div>
      </li> 
    );
  }
}
