import React from 'react';
import ReactDOM from 'react-dom';


export default class EditorToolbar extends React.Component{
// var EditorToolbar = React.createClass({
  render() {
    return (
      <div>
      {/* Editor Toolbar */}
      <div className="navbar navbar-default" id="docbar">
        <div className="container">
          <div className="navbar-header pull-left">
            <ul id="docbar-list" className="nav navbar-nav pull-right">
              <li className="divider-vertical"> </li>
              <li>
              <button data-toggle="dropdown" className="dropdown-toggle">
                File
              </button>
                <ul className="dropdown-menu">
                  <li><a href="#">New</a></li>
                  <li><a href="#">Open</a></li>
                  <li><a href="#">Save</a></li>
                  <li><a href="#">Save As</a></li>
                  <li><a href="#">Rename</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
              <li>
              <button data-toggle="dropdown" className="dropdown-toggle">
                  Edit
              </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Undo</a></li>
                  <li><a href="#">Redo</a></li>
                  <li><a href="#">Select All</a></li>
                  <li><a href="#">Find & Replace</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
              <li>
                <button data-toggle="dropdown" className="dropdown-toggle">
                  View
                </button>
                <ul className= "dropdown-menu">
                  <li><a href="#">Layout</a></li>
                  <li><a href="#">Screen Size</a></li>
                  <li><a href="#">Line Count</a></li>
                  <li><a href="#">Option4</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
              <li>
                <button data-toggle="dropdown" className="dropdown-toggle">
                  Share
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">Download</a></li>
                  <li><a href="#">Email</a></li>
                  <li><a href="#">Export</a></li>
                  <li><a href="#">Option4</a></li>
                </ul>
              </li>
              <li className="divider-vertical"> </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


ReactDOM.render
(
  <EditorToolbar />, document.getElementById('docbar')
);

// export default class EditorToolbar extends React.Component({
//   render() {
//     return (
//       <div>
//       // {/* Editor Toolbar */}
//       <div className="navbar navbar-default" id="docbar">
//         <div className="container">
//           <div className="navbar-header pull-left">
//             <ul id="docbar-list" className="nav navbar-nav pull-right">
//               <li className="divider-vertical"> </li>
//               <li><a href="#">File<span className="sr-only">(current)</span></a></li>
//               <li className="divider-vertical"> </li>
//               <li><a href="#">Edit<span className="sr-only">(current)</span></a></li>
//               <li className="divider-vertical"> </li>
//               <li><a href="#">View<span className="sr-only">(current)</span></a></li>
//               <li className="divider-vertical"> </li>
//               <li><a href="#">Share<span className="sr-only">(current)</span></a></li>
//               <li className="divider-vertical"> </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//     );
//   }
// })

// class EditorToolbar extends React.Component
// {
//   constructor(props)
//   {
//     super(props)
//     this.state=
//     {
//       open:false
//     }
//   }
//
//   _handleDropDown()
//   {
//     // console.log('dropdown')
//    this.setState({
//      open:!this.state.open
//    })
//   }
//
//   render()
//   {
//     return <div>
//       <button type = "button" onClick={this._handleDropDown.bind(this)}>File</button>
//         <div onClick={this._handleDropDown.bind(this)} className="navbar navbar-default" id="docbar">
//           <div className="container">
//             <div className="navbar-header pull-left">
//               <ul id="docbar-list" className="nav navbar-nav pull-right">
//                 <li clasmoodsName="divider-vertical"> </li>
//                 <li><a href="#">File<span className="sr-only">(current)</span></a></li>
//                 <li className="divider-vertical"> </li>
//                 <li><a href="#">Edit<span className="sr-only">(current)</span></a></li>
//                 <li className="divider-vertical"> </li>
//                 <li><a href="#">View<span className="sr-only">(current)</span></a></li>
//                 <li className="divider-vertical"> </li>
//                 <li><a href="#">Share<span className="sr-only">(current)</span></a></li>
//                 <li className="divider-vertical"> </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//   </div>;
//   }
// }
//
// React.render(<EditorToolbar />, document.getElementById('docbar'));
// import ReactDOM from 'react-dom';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//
// export default class EditorToolbar extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false
//     };
//   }
//
//   toggle() {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen
//     });
//   }
//
//   render() {
//   return (
//     <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//       <DropdownToggle caret>
//         Dropdown
//       </DropdownToggle>
//       <DropdownMenu>
//         <DropdownItem header>Header</DropdownItem>
//         <DropdownItem disabled>Action</DropdownItem>
//         <DropdownItem>Another Action</DropdownItem>
//         <DropdownItem divider />
//         <DropdownItem>Another Action</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
// }
