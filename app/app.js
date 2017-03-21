import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import SavedDocuments from './components/SavedDocuments';
// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('workspace') !== null) {
  ReactDOM.render(
          <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' />,
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
