import React, {Component}                   from 'react';
import { Link } from 'react-router';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div>
          <Link to={'/pitch'}>- To the Pitch</Link>
          <br />
          <Link to={'/live-component'}>- To the LiveComponent</Link>
        </div>
        --------------------------
        <div>
          Shorkeys für Pitch-View:<br/>
          <ul>
            <li>(left) kachel nach links</li>
            <li>(right) kachel nach rechts</li>
            <li>(ESC) zurück von detail view</li>
          </ul>
        </div>
      </div>
    );
  }
}
