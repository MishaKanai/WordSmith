import React from 'react';
import {getUserDocuments, getCollections, postDocumentToUser,getMostRecentUserDocument} from '../server';
import {Link,Route} from 'react-router';
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



    handleNewDocument(){
        const now = Date.now();
        postDocumentToUser(this.props.userId, 'untitled', 'new doc', now, (doc) => {
            this.setState((state) => {
                return {
                    documents: state.documents.concat([doc]),
                    collections: state.collections

                }
            });
        });


    }
    handleToNewDocument(){
      //<Link to={"/workspace/"+ getMostRecentUserDocument(this.props.userId)}></Link>

    }
    render() {
        return (
          <div>

          <div className="item  col-lg-3 col-lg-offset-1 add-new-doc-btn" id="documents">
            <div className="row">
              <div classNameName="col-sm-4">
                <button type="button" className="btn btn-primary" onClick={() => this.handleNewDocument()}>New Document</button>
                <p></p>
                    <div className="row">
                      <div className="col-sm-4">
                        <button type="button" className="btn btn-primary" onClick={() => this.handleNewCollection()}>New Collection</button>

                      </div>
                      </div>
                    </div>

                  </div>
          </div>
          <p></p>




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
                          this.state.collections.map((coll, i) =>  <Link to={"/workspace/"+coll.documents} key={i}>

                              <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-folder-open"></span>
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
