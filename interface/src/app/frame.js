import React, {Component} from 'react';

export default class extends Component {
  render() {
    return (
      <div className="frame">
        {this.props.children}
      </div>
    );
  }
}
