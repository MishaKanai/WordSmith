import React from 'react'

export class SettingsListElements extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.onChange(this.props.id, event.target.value)
    }

    render() {
			const elementArray = this.props.elementArray.map((oneElement) =>
				<option key={oneElement} selected={this.props.selected === oneElement ? "selected" : ""}>{oneElement}</option>
			)
            return (
                    <select className="pull-right" id="sel1" onChange={this.handleChange}>
                    {elementArray}
                    </select>
                   )
    }
}
