'use strict';

import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'

import NavBar from './components/Navbar';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import {SavedDocuments} from './components/SavedDocuments';
import {SavedCollections} from './components/SavedCollections';
import EditorToolbar from './components/EditorToolbar';
import {resetDatabase} from './server';
import ErrorBanner from './components/errorbanner';
import NotFoundPage from './components/NotFoundPage';

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
