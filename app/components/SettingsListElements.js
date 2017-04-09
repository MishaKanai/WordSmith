import React from 'react'

export class SettingsListElements extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                selected: this.props.selected
            }

        this.handleChange = this.handleChange.bind(this)
        this.loadElement = this.loadElement.bind(this)
    }

    handleChange(event) {
        this.props.onChange(this.props.id, event.target.value)
    }

    loadElement(value, index, arr) {
        if(value === this.state.selected) {
            arr[index] = "<option onChange={this.handleChange} selected>" + value + "</option>"
        } else {
            arr[index] = "<option onChange={this.handleChange}>" + value + "</option>"
        }
    }

    render() {
        var elementArray = this.props.elementArray
            elementArray.forEach(this.loadElement)
            return (
                    <select className="pull-right" id="sel1">
                    {elementArray}
                    </select>
                   )
    }
}
