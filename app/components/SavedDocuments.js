import React from 'react';
import {getUserDocuments, getCollections,
        postCollection,postDocumentToUser, deleteUserDocument} from '../server';
import {Link, withRouter, Route} from 'react-router';
import rasterizeHTML from 'rasterizehtml';

 class SavedDocumentsI extends React.Component {

    constructor(props) {
        super(props);
        this.state={

            documents:[],
            collections:[]
        }
    }

    componentDidMount() {

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

     deleteDocument(docId) {
         deleteUserDocument(this.props.userId, docId, (documents) => {
             this.setState({
                 documents: documents
             });
         });
     }

    handleNewDocument(){
        const now = Date.now();

        postDocumentToUser(this.props.userId, 'untitled', 'new doc', now, (doc) => {
            this.setState((state) => {
                return {
                    documents: state.documents.concat([doc]),
                    collections: state.collections

                }
            });

            this.props.router.push('/workspace/'+doc._id);
        });


    }
    handleNewCollection(){

        postCollection(this.props.userId, 'untitled collection',(coll) => {
            this.setState({
                    collections: this.state.collections.concat([coll])
                  });
        });


    }

    render() {
        return (
          <div>

          <div className="item col-md-12 add-new-doc-btn" id="new-item-button-row">
            <div className="row">
                <button type="button" className="btn" onClick={() => this.handleNewDocument()}>New Document</button>
                <button type="button" className="btn" onClick={() => this.handleNewCollection()}>New Collection</button>
            </div>
          </div>

            <div className="row list-group" id="documents">
              <ul className="document-list">
              {
                  this.state.documents.map((doc, i)=>

                          <div className="item  col-xs-4 col-lg-4" key={i}>
                            <div className="thumbnail">
                              <Link to={"/workspace/"+doc._id} >
                                           <canvas id={'canvas_'+doc._id} key ={999+doc._id} className="group list-group-image"></canvas>
                                <div className="caption">
                                  <h4 className="group inner list-group-item-heading">
                                    <span className="glyphicon glyphicon-file" id="saved-docs-glyphicon"></span>
                                    {doc.title}
                                  </h4>
                                </div>
                              </Link>
                                           <span className="btn del-btn" data-toggle="modal" data-target={"#deleteWorkspace"+doc._id} >
                                <span className="glyphicon glyphicon-remove"></span>
                              </span>
                            </div>



                                           {/* MODAL DELETE WORKSPACE */}
                                           <div id={"deleteWorkspace"+doc._id} className="modal fade del-doc-modal" role="dialog">
                                           <div className="modal-dialog">
                                           <div className="modal-content">
                                           <div className="modal-header">
                                           <button type="button" className="close" data-dismiss="modal">&times;</button>
                                           <h4 className="modal-title">Are you sure you want to delete the document "{doc.title}"?</h4>
                                           </div>
                                           <div className="modal-body del-doc-modal-body">
                                           <button type="button" className="btn btn-danger del-doc-modal-btn" data-dismiss="modal" onClick={() => this.deleteDocument(doc._id)}>Delete Document</button>
                                           </div>
                                           </div>
                                           </div>
                                           </div>
                          </div>
                                          )
              }
              {
                  <div className="item  col-xs-4 col-lg-4" key={this.state.documents.length + 1}>
                    <div className="thumbnail">
                      {
                          this.state.collections.map((coll, i) =>  <Link to={"/collections/"+coll._id} key={i}>

                              <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-folder-open" id="saved-docs-glyphicon"></span>
                                  {' '+coll.name}
                                </h4>
                              </div>
                            </Link>
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

export var SavedDocuments = withRouter(SavedDocumentsI);
SavedDocumentsI.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
