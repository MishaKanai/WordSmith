'use strict';

import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'

import NavBar from './components/Navbar';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import {SavedDocuments} from './components/SavedDocuments';
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
