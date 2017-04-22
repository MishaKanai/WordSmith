import React from 'react';
import {getCollectionDocuments, postDocumentToCollection, getCollections,
  postCollection,postDocumentToUser} from '../server';
import {Link, withRouter, Route} from 'react-router';
import rasterizeHTML from 'rasterizehtml';

 class SavedCollectionsI extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            documents:[],
        }
    }
    componentDidMount() {
        getCollectionDocuments(this.props.collId, (docs)=> {
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



    handleNewDocument(){
        const now = Date.now();

        postDocumentToCollection(this.props.collId, 'untitled', 'new doc', now, (doc) => {
            this.setState((state) => {
                return {
                    documents: state.documents.concat([doc]),
                }
            });
            this.props.router.push('/workspace/'+doc._id);
        });

    }

    render() {
        return (
          <div>

          <div className="item col-md-12 add-new-doc-btn" id="new-item-button-row">
            <div className="row">
                <button type="button" className="btn" onClick={() => this.handleNewDocument()}>New Document</button>
            </div>
          </div>

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
                                  <span className="glyphicon glyphicon-file" id="saved-docs-glyphicon"></span>
                                  {doc.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </Link>
                                          )
              }

              </ul>
            </div>
          </div>

        )
    }
}

export var SavedCollections = withRouter(SavedCollectionsI);
SavedCollectionsI.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
