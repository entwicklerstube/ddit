import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className={`pitch-tile ${this.props.active ? 'active' : ''}`}>
      </div>
    );
  }
}
