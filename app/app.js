import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory, Link } from 'react-router'

import NavBar from './components/Navbar';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import SavedDocuments from './components/SavedDocuments';


class WorkspacePage extends React.Component {
    render() {
        return (
                <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' docId={this.props.params.id} />
        );
    }
}

class SavedDocumentsPage extends React.Component {
    render() {
        return (
                <div>
                <br/>
                <SavedDocuments  userId={1}/>
            </div>
        );
    }

}



/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 *
 * This will contain the navbar
 */
class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render((
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={SavedDocumentsPage} />
            <Route path="workspace/:id" component={WorkspacePage} />
          </Route>
        </Router>
),document.getElementById('app'));


/*
// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('workspace') !== null) {
  ReactDOM.render(
          <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' docId='1' />,
    document.getElementById('workspace')
  );

} else if (document.getElementById('settings') !== null) {
  ReactDOM.render( <Settings />,
  document.getElementById('settings')
);

} else if (document.getElementById('documents') !== null) {
  ReactDOM.render( <SavedDocuments  />,
  document.getElementById('documents')
);
}
*/
