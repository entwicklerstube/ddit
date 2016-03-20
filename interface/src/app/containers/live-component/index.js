import React, {Component}                   from 'react';

import {presets, StaggeredMotion, TransitionMotion, Motion, spring} from 'react-motion';

import animate, {EasingFunctions, timeline} from '../../vendor/animation';


const BarLeft = ({progress}) => (
  <div className="bar">
    <div className="bar__text bar__text--left">{progress.toFixed(0)} %</div>
    <div className="bar__wrapper">
      <div className="bar__empty" style={ { width: (100-progress) + '%'} }/>
      <div className="bar__container" style={ { width: progress + '%'} }/>
    </div>
  </div>
);

const BarRight = ({progress}) => (
  <div className="bar">
    <div className="bar__wrapper">
      <div className="bar__container" style={ { width: progress + '%'} }/>
    </div>
    <div className="bar__text">{progress.toFixed(0)} %</div>
  </div>
);

export default class extends Component {

  state = {
    row_0: 0,
    row_1: 0,
    row_2: 0
  };

  animateEnterRow(row) {
    return () => {
      animate(400, p => {
        this.setState({['row_' + row]: p});
      }, EasingFunctions.easeInOutQuad)
    };
  };

  animateLeaveRow(row) {
    return () => {
      animate(200, p => {
        this.setState({['row_' + row]: ((p-1)*(-1))});
      }, EasingFunctions.easeInOutQuad)
    };
  };

  componentDidMount() {
    timeline([
      400, this.animateEnterRow(0),
      800, this.animateEnterRow(1),
      1200, this.animateEnterRow(2)
    ]);
  }

  constructor(props) {
    super(props);

    setTimeout(() => {
      timeline([
        0, this.animateLeaveRow(2),
        200, this.animateLeaveRow(1),
        400, this.animateLeaveRow(0)
      ]);
    }, 4000)

  }

  render() {
    const {row_0, row_1, row_2} = this.state;

    return <div className="live-component">
      <div className="box" style={ {height: row_0 * 80} }>
        <div className="row">
          <BarLeft progress={60 * row_0}/>
          <BarRight progress={90 * row_0}/>
        </div>
        <div className="achievement">
          POSESSION
        </div>
      </div>
      <div className="box" style={ {height: row_1 * 80} }>
        <div className="row">
          <BarLeft progress={80 * row_1}/>
          <BarRight progress={20 * row_1}/>
        </div>
        <div className="achievement" style={ {height: row_1 * 40} }>
          DUELS WON
        </div>
      </div>
      <div className="box" style={ {height: row_2 * 80} }>
        <div className="row">
          <BarLeft progress={45 * row_2}/>
          <BarRight progress={55 * row_2}/>
        </div>
        <div className="achievement" style={ {height: row_2 * 40} }>
          SHOTS ON GOAL
        </div>
      </div>
    </div>
  }
}
