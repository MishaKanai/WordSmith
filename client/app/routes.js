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



class WorkspacePage extends React.Component {
  render() {
    return (
      <div>
      <EditorToolbar />

      <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' synonymAPIprefix = 'http://api.datamuse.com/words?ml=' definitionAPIprefix = 'http://api.datamuse.com/words?md=d&&sp=' docId={this.props.params.id} />
      </div>
    );
  }
}

class SavedDocumentsPage extends React.Component {
  render() {
    return (
      <div>
      <br/>
      <SavedDocuments userId={1} collId={null}/>
      </div>
    );
  }

}
class CollectionsPage extends React.Component {
  render() {
    return (
      <div>
      <br/>
      <SavedDocuments userId={1} collId={this.props.params.id}/>
      </div>
    );
  }

}

class SettingsPage extends React.Component {
  render() {
    return (
      <div>
      <br/>
      <Settings userId={this.props.params.id}/>
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
    this.getThemeColor = this.getThemeColor.bind(this)
  } 

  getThemeColor(theme) {
    if (theme === "Dark") {
      return "#333366"
    } else if (theme === "Light") {
      return "#ffffcc"
    } else if (theme === "Gold") {
      return "#D4AF37"
    } else {
      return "#553555"
    }
  }

  componentDidMount() {
    getUserSettings(1, (settings) => {
      var themeColor = this.getThemeColor(settings.settings.theme)
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
      <NavBar userId={1}/>
      {this.props.children}
      </div>
    )
  }
}


const routes = (

  <Route path="/" component={App}>
  <IndexRoute component={SavedDocumentsPage} />
  <Route path="workspace/:id" component={WorkspacePage} />
  <Route path="settings/:id" component={SettingsPage} />
  <Route path="collections/:id" component={CollectionsPage} />
  <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
