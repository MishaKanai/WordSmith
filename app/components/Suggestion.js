import React from 'react';

export default class Suggestion extends React.Component{
  render(){
    return(
      <div>
          <li className="list-group-item">
            {this.props.word}
          </li>
      </div>
    )
    }
  }
