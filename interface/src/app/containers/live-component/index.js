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

  animateRow(row) {
    return () => {
      animate(400, p => {
        this.setState({['row_' + row]: p});
      }, EasingFunctions.easeInOutQuad)
    };
  };

  componentDidMount() {
    timeline([
      500, this.animateRow(0),
      1300, this.animateRow(1),
      2100, this.animateRow(2)
    ]);
  }

  render() {
    const {row_0, row_1, row_2} = this.state;

    return <div className="live-component">
      <div className="row">
        <BarLeft progress={60 * row_0}/>
        <BarRight progress={90 * row_0}/>
      </div>
      <div className="achievement" style={ {height: row_0 * 40} } >
        POSESSION
      </div>
      <div className="row">
        <BarLeft progress={80 * row_1}/>
        <BarRight progress={20 * row_1}/>
      </div>
      <div className="achievement" style={ {height: row_1 * 40} }>
        DUELS WON
      </div>
      <div className="row">
        <BarLeft progress={45 * row_2}/>
        <BarRight progress={55 * row_2}/>
      </div>
      <div className="achievement" style={ {height: row_2 * 40} }>
        SHOTS On GOAL
      </div>
    </div>
  }
}
