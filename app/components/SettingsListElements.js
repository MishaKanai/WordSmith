import React from 'react'

export class SettingsListElements extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                selected: this.props.selected
            }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.onChange(this.props.id, event.target.value)
    }

    render() {
			const elementArray = this.props.elementArray.map((oneElement) =>
				<option key={oneElement}>{oneElement}</option>
			)
            return (
                    <select className="pull-right" id="sel1" defaultValue={this.state.selected} onChange={this.handleChange}>
                    {elementArray}
                    </select>
                   )
    }
}
