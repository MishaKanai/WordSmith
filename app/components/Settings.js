import React from 'react';

export default class Settings extends React.Component {
  render() {
    return (
    <div class="container">
      <div id="updatePassword" class="modal fade" role="dialog">
        <div class="modal-dialog pwd-box">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Update password</h4>
            </div>
            <div class="modal-body">
              <ul class="list-group">
                <li class="list-group-item bottom-border-only">
                  <div class="form-group">
                    <label for="oldPwd">Old password</label>
                    <input type="password" class="form-control" id="OldPwd">
                  </div>
                </li>
                <li class="list-group-item bottom-border-only">
                  <div class="form-group">
                    <label for="newPwd">New password</label>
                    <input type="password" class="form-control" id="newPwd">
                  </div>
                </li>
                <li class="list-group-item bottom-border-only">
                  <div class="form-group">
                    <label for="newPwd2">Confirm new password</label>
                    <input type="password" class="form-control" id="newPwd2">
                  </div>
                </li>
                <li class="list-group-item bottom-border-only">
                  <button type="button" class="btn btn-success modal-btn" data-dismiss="modal">Update</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="deleteAccount" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Are you sure you want to delete your account?</h4>
            </div>
            <div class="modal-body">
              <button type="button" class="btn btn-danger modal-btn" data-dismiss="modal">Delete account</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row-fluid">
        <div class="col-md-10 col-md-offset-1 white-box">
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <ul class="list-group">
            <li class="list-group-item bottom-border-only">
              <h1 class="text-center">Settings</h1>
            </li>
            <li class="list-group-item bottom-border-only">
              <h3 class="text-center">Wordsmith editor default settings</h3>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <span class="left-hand-text">Theme</span>
              <select class="pull-right" id="sel1">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <span class="left-hand-text">Font</span>
              <select class="pull-right" id="sel1">
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <span class="left-hand-text">Font size</span>
              <select class="pull-right" id="sel1">
                <option>10</option>
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
              </select>
            </li>
            <li class="list-group-item bottom-border-only">
              <h3 class="text-center">Account settings</h3>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <span class="left-hand-text">Display name</span>
              <div class="right-element pull-right">
                <input type="text" class="form-control display-name pull-left" value="Kendrick Lamar" disabled>
                <button type="button" class="btn btn-default display-name-btn pull-right">
                  <span class="glyphicon glyphicon-pencil"></span>
                </button>
              </div>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <span class="left-hand-text">Email</span>
              <div class="right-element pull-right">
                <input type="text" class="form-control display-name pull-left" value="klamar@tde.us" disabled>
                <button type="button" class="btn btn-default display-name-btn pull-right">
                  <span class="glyphicon glyphicon-pencil"></span>
                </button>
              </div>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <span class="left-hand-text">Password</span>
              <button type="button" class="btn btn-default right-element pull-right" data-toggle="modal" data-target="#updatePassword">
                Update
              </button>
            </li>
            <li class="list-group-item bottom-border-only clearfix">
              <button type="button" class="btn btn-danger delete-btn" data-toggle="modal" data-target="#deleteAccount">
                Delete account
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    )
  }
}
