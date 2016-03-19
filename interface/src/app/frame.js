import React, {Component} from 'react';

export default class extends Component {
  render() {
    return (
      <div className="frame">
        This is the frame of the..
        {this.props.children}
      </div>
    );
  }
}
