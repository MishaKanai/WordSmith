//import TextEditor from "./TextEditor";
import Workspace from "./Workspace";
import ReactDOM from 'react-dom';
import React from 'react';

var app = document.createElement('div');
app.id = 'app';

document.body.appendChild(app);

ReactDOM.render( <Workspace rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' />, app );
