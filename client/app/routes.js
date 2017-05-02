'use strict';

import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'

import NavBar from './components/Navbar';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import {SavedDocuments} from './components/SavedDocuments';
import {getUserSettings} from './server'
import EditorToolbar from './components/EditorToolbar';
import {resetDatabase} from './server';
import ErrorBanner from './components/errorbanner';
import NotFoundPage from './components/NotFoundPage';
import getThemeColor from './js/getThemeColor';



class WorkspacePage extends React.Component {
  render() {
    return (
      <div>
      <EditorToolbar />

      <Workspace title='Document1' rhymeAPIprefix='https://api.datamuse.com/words?rel_rhy=' synonymAPIprefix = 'https://api.datamuse.com/words?ml=' definitionAPIprefix = 'https://api.datamuse.com/words?md=d&&sp=' docId={this.props.params.id} />
      </div>
    );
  }
}

class SavedDocumentsPage extends React.Component {
    render() {
        return (
                <div>
                <br/>
                <SavedDocuments userId={"000000000000000000000001"} collId={null}/>
            </div>
        );
    }

}
class CollectionsPage extends React.Component {
    render() {
        return (
                <div>
                <br/>
                <SavedDocuments userId={"000000000000000000000001"} collId={this.props.params.id}/>
            </div>
        );
    }
}

class SettingsPage extends React.Component {
    render() {
        return (
            <div>
            <br/>
                <Settings userId={"000000000000000000000001"}/>
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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getUserSettings("000000000000000000000001", (settings) => {
      var themeColor = getThemeColor(settings.settings.theme)
      if (typeof document !== 'undefined') {
        document.body.style.backgroundColor = themeColor
        document.documentElement.style.backgroundColor = themeColor
      }

    });
  }

    render() {
        return (
                <div>
                <ErrorBanner />
                <NavBar userId={"000000000000000000000001"}/>
                {this.props.children}
            </div>
        )
    }
}


const routes = (
        <Route path="/wordsmith" component={App}>
        <IndexRoute component={SavedDocumentsPage} />
        <Route path="workspace/:id" component={WorkspacePage} />
        <Route path="settings" component={SettingsPage} />
        <Route path="collections/:id" component={CollectionsPage} />
        <Route path="*" component={NotFoundPage}/>
        </Route>
);

export default routes;
