import React from 'react';
import TextEditor from './TextEditor';
class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //we will store info returned from api here.
            info: null,
        }
    }
    getRhymes(word) {
        $.ajax({
            url: this.props.rhymeAPIprefix + word,
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({info: JSON.stringify(data)});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        return (<div className='workspace-inner-wrapper container'>
                <h3>{' '+this.props.title}</h3>
                <row>

                <div className='col-md-8 leftcol'>
                <TextEditor
                getRhymes={(word)=>this.getRhymes(word)}
                />
                </div>

                <div className='col-md-4'>
                <textarea id="results-box" value={this.state.info}></textarea>
                </div>

                </row>

                </div>)
    }
}

export default Workspace;
