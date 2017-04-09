import React from 'react'

export class SettingsEditElement extends React.Component {
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
	if(this.state.enabled === true) {
		this.props.onChange(this.props.id, event.target.value)   
	}
    this.setState(prevState => ({
      enabled: !prevState.enabled	  
    }));
  }

  handleChange(event) {
	  this.setState({value: event.target.value})
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
