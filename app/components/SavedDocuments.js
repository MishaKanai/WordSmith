import React from 'react';

export default class SavedDocuments extends React.Component {
  render() {
    return (
      <div className="row list-group" id="documents">
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <img className="group list-group-image" src="img/doc_temp.png" alt="" />

                  <div className="caption">

                      <h4 className="group inner list-group-item-heading">
              <span className="glyphicon glyphicon-file"></span>
                          + New Document</h4>

                  </div>
              </div>
          </div>
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <img className="group list-group-image" src="img/doc_temp.png" alt="" />
                  <div className="caption">

                      <h4 className="group inner list-group-item-heading">
              <span className="glyphicon glyphicon-file"></span>Document 1</h4>

            </div>
              </div>
          </div>
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <img className="group list-group-image" src="img/doc_temp.png" alt="" />
                  <div className="caption">
                      <h4 className="group inner list-group-item-heading">
              <span className="glyphicon glyphicon-file"></span>
                          Document 2</h4>
                  </div>
              </div>
          </div>
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <img className="group list-group-image" src="img/doc_temp.png" alt="" />
                  <div className="caption">
                      <h4 className="group inner list-group-item-heading">
              <span className="glyphicon glyphicon-file"></span>
                          Document 3</h4>
                  </div>
              </div>
          </div>
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <img className="group list-group-image" src="img/doc_temp.png" alt="" />
                  <div className="caption">
                      <h4 className="group inner list-group-item-heading">
              <span className="glyphicon glyphicon-file"></span>
                          Document 4</h4>

                  </div>
              </div>
          </div>
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <img className="group list-group-image" src="img/doc_temp.png" alt="" />
                  <div className="caption">

                      <h4 className="group inner list-group-item-heading"> <span className="glyphicon glyphicon-file"></span>Document 5</h4>

                  </div>
              </div>
      </div>
      </div>

    )
  }
}
