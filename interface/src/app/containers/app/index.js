import React, {Component}                   from 'react';
import { Link } from 'react-router';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Link to={'/pitch'}>To the Pitch</Link>
        <Link to={'/live-component'}>To the LiveComponent</Link>
      </div>
    );
  }
}