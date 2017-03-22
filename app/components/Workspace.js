import React from 'react';
import TextEditor from './TextEditor';
import SuggestionsBar from './SuggestionsBar';
class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //we will store info returned from api here.
            info: null
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

                <row>

                <div className='col-md-8 leftcol'>
                <h3 id='doc-title'>{' '+this.props.title}</h3>
                <TextEditor
                getRhymes={(word)=>this.getRhymes(word)}
                />
                </div>
                <SuggestionsBar />

                </row>

                </div>)
    }
}

export default Workspace;
