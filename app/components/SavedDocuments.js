import React from 'react';
import {getUserDocuments, getCollections} from '../server';
import {Link} from 'react-router';
import rasterizeHTML from 'rasterizehtml';

export default class SavedDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            documents:[],
            collections:[]
        }
    }
    componentDidMount() {
        console.log(this.props.userId);
        getCollections(this.props.userId, (colls) => {
            this.setState({
                collections: colls
            });
        });
        getUserDocuments(this.props.userId, (docs)=> {
            this.setState({
                documents: docs
            });
        });
    }
    componentDidUpdate() {
        this.state.documents.forEach((doc) => {
            rasterizeHTML.drawHTML(doc.text,
                                   document.getElementById('canvas_'+doc._id)
                                  );
        });
    }
    render() {
        return (
          <div>
            <div className="row list-group" id="documents">
              <ul className="document-list">
              {
                  this.state.documents.map((doc, i)=>
                                           <Link to={"/workspace/"+doc._id} key={i}>
                          <div className="item  col-xs-4 col-lg-4">
                            <div className="thumbnail">
                                           <canvas id={'canvas_'+doc._id} className="group list-group-image"></canvas>
                              <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-file"></span>
                                  {doc.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </Link>
                                          )
              }
              {
                  <div className="item  col-xs-4 col-lg-4" key={this.state.documents.length + 1}>
                    <div className="thumbnail">
                      {
                          this.state.collections.map((coll, i) =>
                              <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-folder-open"></span>
                                  {' '+coll.name}
                                </h4>
                              </div>
                                                    )
                      }
                    </div>
                  </div>
              }
              </ul>
            </div>
          </div>
        )
    }
}
