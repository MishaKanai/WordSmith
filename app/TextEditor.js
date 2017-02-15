import React from 'react';

class TextEditor extends React.Component {
    rightClick(e) {
  	e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const word = e.target.value.slice(start,end);
        //replace alert with modal for html
        alert(
            'You have selected the word "'+word+'"\n'+
                '[link]Thesaurus for "'+word+'"\n'+
                '[link]Rhymes for "'+word+'"\n'+
                '[link]Definition of "'+word+'"\n\n'+
                'Clicking any of these ^ links will initialize an ajax call, and on success render data on a panel on the right side of the page.\n'
        );

    }
    render() {
        return (<textarea onContextMenu={this.rightClick}>
	        Right click on any word to extract it, and see options.
	        </textarea>);
    }
}

export default TextEditor;
