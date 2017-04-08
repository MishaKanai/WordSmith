import React from 'react';
import {getUserDocuments, getCollections} from '../server';

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
    render() {
        return (
          <div>
            <div className="row list-group" id="documents">
              <ul className="document-list">
              {
                  this.state.documents.map((doc, i)=>
                          <div className="item  col-xs-4 col-lg-4" key={i}>
                            <div className="thumbnail">
                              <img className="group list-group-image" src="img/doc_temp.png" alt=""/>
                              <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-file"></span>
                                  {doc.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                                          )
              }
              {
                  <div className="item  col-xs-4 col-lg-4" key={this.state.documents.length + 1}>
                    <div className="thumbnail">
                      {
                          this.state.collections.map((coll, i) =>
                              <div className="caption">
                                <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-file"></span>
                                  {coll.name}
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
