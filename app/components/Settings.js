import React from 'react'
import {SettingsEditElement} from './SettingsEditElement'
import {SettingsElement} from './SettingsElement'
import {SettingsListElements} from './SettingsListElements'
import {SettingsUpdatePwModal} from './SettingsUpdatePwModal'

export default class Settings extends React.Component {
  render() {
    return (
      <div>

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
      <SettingsUpdatePwModal />
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
      <div className="col-md-10 col-md-offset-1 white-box"></div>
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
      <SettingsElement subject="Theme"><SettingsListElements id="Theme" elementArray={['Light', 'Dark', 'Gold']}/></SettingsElement>
      <SettingsElement subject="Font"><SettingsListElements id="Font" elementArray={['Arial', 'Comic-Sans', 'Courier-New', 'Times New Roman']} /></SettingsElement>
      <SettingsElement subject="Font size"><SettingsListElements id="Font size" elementArray={['10', '12', '14', '16', '18']} /></SettingsElement>
      <li className="list-group-item bottom-border-only">
      <h3 className="text-center">Account settings</h3>
      </li>
      <SettingsElement subject="Display name"><SettingsEditElement value="Kendrick Lamar" /></SettingsElement>
      <SettingsElement subject="Email"><SettingsEditElement value="klamar@tde.us" /></SettingsElement>
      <SettingsElement subject="Password">
      <button type="button" className="btn btn-default right-element pull-right" data-toggle="modal" data-target="#updatePassword">Update</button>  
      </SettingsElement>
      <li className="list-group-item bottom-border-only clearfix">
      <button type="button" className="btn btn-danger delete-btn" data-toggle="modal" data-target="#deleteAccount">
      Delete account
      </button>
      </li>
      </ul>
      </div>
      </div>
      </div>

      </div>
    )
  }
}
