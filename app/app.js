import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory} from 'react-router'

import NavBar from './components/Navbar';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import {SavedDocuments} from './components/SavedDocuments';
import {SavedCollections} from './components/SavedCollections';
import EditorToolbar from './components/EditorToolbar';



class WorkspacePage extends React.Component {
    render() {
        return (
          <div>
                <EditorToolbar />
                <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' docId={this.props.params.id} />
          </div>
        );
    }
}

class SavedDocumentsPage extends React.Component {
    render() {
        return (
                <div>
                <br/>
                <SavedDocuments userId={1}/>
            </div>
        );
    }

}
class CollectionsPage extends React.Component {
    render() {
        return (
                <div>
                <br/>
                <SavedCollections userID={1} collId={this.props.params.id}/>
            </div>
        );
    }

}

class SettingsPage extends React.Component {
    render() {
        return (
            <div>
            <br/>
            <Settings userId={1}/>
            </div>
        )
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
                <NavBar userId={1}/>
                {this.props.children}
            </div>
        )
    }
}

if (document.getElementById('app') !== null) {
    ReactDOM.render((
            <Router history={browserHistory}>
              <Route path="/" component={App}>
                <IndexRoute component={SavedDocumentsPage} />
                <Route path="workspace/:id" component={WorkspacePage} />
                <Route path="settings/:id" component={SettingsPage} />
                <Route path="collections/:id" component={CollectionsPage} />
              </Route>
            </Router>
    ),document.getElementById('app'));
}



// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
else if (document.getElementById('workspace') !== null) {
  ReactDOM.render(
          <Workspace title='Document1'
                rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word='
                synonymAPIprefix='http://api.datamuse.com/words?rel_syn='
                definitionAPIprefix='http://api.datamuse.com/words?md=d&&sp='
                docId='1' />,
    document.getElementById('workspace')
  );

} else if (document.getElementById('settings') !== null) {
  ReactDOM.render( <Settings userId={1}/>,
  document.getElementById('settings')
);

} else if (document.getElementById('documents') !== null) {
  ReactDOM.render( <SavedDocuments userId={1} />,
  document.getElementById('documents')
);
}
