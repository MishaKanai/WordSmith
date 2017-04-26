import React from 'react';

export default class NewCollectionModal extends React.Component {
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
            $('#newCollModal').modal('hide');
            this.props.onSubmit(value);
        }

    }

    render() {
        return (
          <div className="newCollForm">
          <input className="newCollTitleInput" placeholder="Title" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
          <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Create Collection</button>
          </div>
        );
    }
}
