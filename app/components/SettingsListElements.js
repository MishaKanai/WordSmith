import React from 'react'

export class SettingsListElements extends React.Component {
  render() {
    const elementArray = this.props.elementArray;
    const listItems = elementArray.map((element) =>
      <option>{element}</option>
    );
    return (
      <select className="pull-right" id="sel1">
      {listItems}
      </select>
    );
  }
}
