import React from 'react';

class Element extends React.Component {
    render() {
        return (
            <li className="list-group-item bottom-border-only clearfix">
              <span className="left-hand-text">{this.props.subject}</span>
                {this.props.children}
            </li>
            )
        }
    }

class ModalElement extends React.Component {
    render() {
        return (
            <li className="list-group-item bottom-border-only">
                <div className="form-group">
                    <label for={this.props.forLabel}>{this.props.subject}</label>
                    {this.props.children}
                </div>
            </li> 
            );
        }
    }

class PasswordBox extends React.Component {
    render() {
        return (
            <input type="password" className="form-control" id={this.props.id} />
            );
        }
    }

class ListElements extends React.Component {
    render() {
        const elementArray = this.props.elementArray;
        const listItems = elementArray.map((element) =>
            <option>{element}</option>
            );
        return (
            <select className="pull-right" id="sel1">
                {listItems}
            </select>
            );
        }
    }

class EditElement extends React.Component {
    render() {
        return (
            <div className="right-element pull-right">
                <input type="text" className="form-control display-name pull-left" value={this.props.displayName} disabled />
                <button type="button" className="btn btn-default display-name-btn pull-right">
                    <span className="glyphicon glyphicon-pencil"></span>
                </button>
            </div> 
            );
        }
    }

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
                <ModalElement forLabel="oldPwd" subject="Old password"><PasswordBox id="oldPwd" /></ModalElement>
                <ModalElement forLabel="newPwd" subject="New password"><PasswordBox id="newPwd" /></ModalElement>
                <ModalElement forLabel="newPwd2" subject="Confirm new password"><PasswordBox id="newPwd2" /></ModalElement>
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
            <Element subject="Theme"><ListElements elementArray={['Light', 'Dark']} /></Element>
            <Element subject="Font"><ListElements elementArray={['Arial', 'Times New Roman']} /></Element>
            <Element subject="Font size"><ListElements elementArray={['10', '12', '14', '16', '18']} /></Element>
            <li className="list-group-item bottom-border-only">
              <h3 className="text-center">Account settings</h3>
            </li>
            <Element subject="Display name"><EditElement displayName="Kendrick Lamar" /></Element>
            <Element subject="Email"><EditElement displayName="klamar@tde.us" /></Element>
            <Element subject="Password">
              <button type="button" className="btn btn-default right-element pull-right" data-toggle="modal" data-target="#updatePassword">Update</button>  
            </Element>
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
