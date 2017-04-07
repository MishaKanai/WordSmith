import React from 'react';

export default class SavedDocuments extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <div className="row list-group" id="documents">
              <ul className="document-list">
              {
                [...Array(5).keys()].map((i)=>

                                         <div className="item  col-xs-4 col-lg-4" key={i}>
                      <div className="thumbnail">
                          <img className="group list-group-image" src="img/doc_temp.png" alt=""/>

                          <div className="caption">

                              <h4 className="group inner list-group-item-heading">
                                  <span className="glyphicon glyphicon-file"></span>
                                  + New Document {i}</h4>
                          </div>
                      </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        )
    }
}
