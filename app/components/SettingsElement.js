import React from 'react'

export class SettingsElement extends React.Component {
  render() {
    return (
      <li className="list-group-item bottom-border-only clearfix">
      <span className="left-hand-text">{this.props.subject}</span>
      {this.props.children}
      </li>
    )
  }
}
