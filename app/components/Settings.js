import React from 'react'
import {SettingsEditElement} from './SettingsEditElement'
import {SettingsElement} from './SettingsElement'
import {SettingsListElements} from './SettingsListElements'
import {SettingsUpdatePwModal} from './SettingsUpdatePwModal'
import {getUserSettings, putSettings} from '../server'

export default class Settings extends React.Component {
    constructor(props) {
        super(props)

            this.state = {
                "email": "",
                "displayName": "",
                "password": "",
                "settings": {
                    "theme": "",
                    "font": "",
                    "fontSize": ""
                }
            }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(id, value) {
        console.log("hc");
        putSettings(this.props.userId, id, value, (settings) => {
            this.setState({
                settings: settings
            });
        })
    }

    componentDidMount() {
        getUserSettings(this.props.userId, (settings) => {
            this.setState({
                settings: settings
            });
        })
    }

    render() {
        var data = this.state

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
                    <SettingsUpdatePwModal onChange={(id, value) => this.handleChange(id, value)} id="password" oldPwd={data.password} />
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
                    <SettingsElement subject="Theme"><SettingsListElements onChange={(id, value) => this.handleChange(id, value)} id="theme" elementArray={['Light', 'Dark', 'Gold']} selected={data.settings.theme} /></SettingsElement>
                    <SettingsElement subject="Font"><SettingsListElements onChange={(id, value) => this.handleChange(id, value)} id="font" elementArray={['Arial', 'Comic-Sans', 'Courier-New', 'Times New Roman']} selected={data.settings.font} /></SettingsElement>
                    <SettingsElement subject="Font size"><SettingsListElements onChange={(id, value) => this.handleChange(id, value)} id="fontSize" elementArray={['10', '12', '14', '16', '18']} selected={data.settings.fontSize} /></SettingsElement>
                    <li className="list-group-item bottom-border-only">
                    <h3 className="text-center">Account settings</h3>
                    </li>
                    <SettingsElement subject="Display name"><SettingsEditElement onChange={(id, value) => this.handleChange(id, value)} id="displayName" value={data.displayName} /></SettingsElement>
                    <SettingsElement subject="Email"><SettingsEditElement onChange={(id, value) => this.handleChange(id, value)} id="email" value={data.email} /></SettingsElement>
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
