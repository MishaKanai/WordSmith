import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import Workspace from './components/Workspace';
//import UI02 from './components/ui-02.js';

// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('workspace') !== null) {
  ReactDOM.render(
          <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' />,
    document.getElementById('workspace')
  );
} else if (document.getElementById('ui-02') !== null) {
  ReactDOM.render(
    <UI02 />,
    document.getElementById('ui-02')
  );
}
