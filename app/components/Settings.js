import React from 'react';

export default class Settings extends React.Component {
  render() {
    return (
    <div>// starting tag of component

    <div className="container">
      <div id="updatePassword" className="modal fade" role="dialog">

        <div className="modal-dialog pwd-box">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Update password</h4>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                <li className="list-group-item bottom-border-only">
                  <div className="form-group">
                    <label for="oldPwd">Old password</label>
                    <input type="password" className="form-control" id="OldPwd" />
                  </div>
                </li>
                <li className="list-group-item bottom-border-only">
                  <div className="form-group">
                    <label for="newPwd">New password</label>
                    <input type="password" className="form-control" id="newPwd" />
                  </div>
                </li>
                <li className="list-group-item bottom-border-only">
                  <div className="form-group">
                    <label for="newPwd2">Confirm new password</label>
                    <input type="password" className="form-control" id="newPwd2" />
                    </div>
                </li>
                <li className="list-group-item bottom-border-only">
                  <button type="button" className="btn btn-success modal-btn" data-dismiss="modal">Update</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="deleteAccount" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Are you sure you want to delete your account?</h4>
            </div>
            <div className="modal-body">
              <button type="button" className="btn btn-danger modal-btn" data-dismiss="modal">Delete account</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-fluid">
        <div className="col-md-10 col-md-offset-1 white-box">
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <ul className="list-group">
            <li className="list-group-item bottom-border-only">
              <h1 className="text-center">Settings</h1>
            </li>
            <li className="list-group-item bottom-border-only">
              <h3 className="text-center">Wordsmith editor default settings</h3>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">Theme</span>
              <select className="pull-right" id="sel1">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">Font</span>
              <select className="pull-right" id="sel1">
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">Font size</span>
              <select className="pull-right" id="sel1">
                <option>10</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
              </select>
            </li>
            <li className="list-group-item bottom-border-only">
              <h3 className="text-center">Account settings</h3>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">Display name</span>
              <div className="right-element pull-right">
                <input type="text" className="form-control display-name pull-left" value="Kendrick Lamar" disabled />
                <button type="button" className="btn btn-default display-name-btn pull-right">
                  <span className="glyphicon glyphicon-pencil"></span>
                </button>
              </div>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">Email</span>
              <div className="right-element pull-right">
                <input type="text" className="form-control display-name pull-left" value="klamar@tde.us" disabled />
                <button type="button" className="btn btn-default display-name-btn pull-right">
                  <span className="glyphicon glyphicon-pencil"></span>
                </button>
              </div>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">Password</span>
              <button type="button" className="btn btn-default right-element pull-right" data-toggle="modal" data-target="#updatePassword">
                Update
              </button>
            </li>
            <li className="list-group-item bottom-border-only clearfix">
              <button type="button" className="btn btn-danger delete-btn" data-toggle="modal" data-target="#deleteAccount">
                Delete account
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

</div>// ending tag of Component
    )
  }
}
