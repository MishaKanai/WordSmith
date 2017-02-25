import TextEditor from "./TextEditor";
import Workspace from "./Workspace";
import ReactDOM from 'react-dom';
import React from 'react';
import ReactQuill from 'react-quill';

var app = document.createElement('div');
app.id = 'app';

document.body.appendChild(app);


ReactDOM.render( <Workspace title='Document1' rhymeAPIprefix='http://rhymebrain.com/talk?function=getRhymes&word=' />, app );


//ReactDOM.render( <TextEditor />, app);
