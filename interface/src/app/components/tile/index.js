import React, { Component } from 'react';

export default class extends Component {
  render() {

    const inlineStyling = {
      background: `url("${this.props.cover}")`
    }

    return (
      <div className={`pitch-tile ${this.props.active ? 'active' : ''}`} style={inlineStyling}></div>
    );
  }
}
