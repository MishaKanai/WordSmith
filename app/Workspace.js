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
                {/*<textarea id="results-box" value={this.state.info}></textarea> */}
                <div className="results-panel thin-border">
                <div className="row">
                  <div className="col-md-12">
                    <ul className="nav nav-pills">
                      <li role="presentation" className="active">
                        <a href="#"><span>
                          Rhyme
                        </span></a>
                      </li>
                      <li role="presentation">
                        <a href="#">
                          <span>
                            Mime
                          </span>
                        </a></li>
                      <li role="presentation">
                        <a href="#">
                          <span>
                            Define
                          </span>
                        </a></li>
                      <li role="presentation">
                        <a href="#">
                          <span>
                            Slang
                          </span>
                        </a></li>
                    </ul>
                  </div>
                </div>
                </div>

                </div>

                </row>

                </div>)
    }
}

export default Workspace;
