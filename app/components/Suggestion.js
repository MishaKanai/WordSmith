import React from 'react';
import { loremipsum } from '../js/LoremIpsum';

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
