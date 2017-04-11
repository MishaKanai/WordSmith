import React from 'react';

export default class NewDocForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(e) {
        let value = this.state.value;
        console.log("statevalue",value);
        if (value) {
            $('#newDocModal').modal('hide');
            this.props.onSubmit(value);
        }
        else {
            //alert("Please enter a title")
        }

    }

    render() {
        return (
                <div className="newDocForm">
                <input className="newDocTitleInput" placeholder="Title" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Create Doc</button>
                </div>
        );
    }
}
