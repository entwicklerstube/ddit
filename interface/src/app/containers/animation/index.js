import React, {Component}                   from 'react';

import animation, {EasingFunctions, timeline} from '../../vendor/animation';

export default class extends Component {

  state = {
    counter: 0
  };

  anim1 = () => {
    animation(2000, p => this.setState({counter: p}), EasingFunctions.easeInOutQuad);
  };

  componentDidMount() {
    this.anim1();
    timeline([
      2000, this.anim1,
      4000, this.anim1
    ]);
  }

  render() {

    return <div>
      <div style={{
        height: 20,
        backgroundColor: 'red',
        width: this.state.counter*100,
      }}></div>
    </div>
  }
}
