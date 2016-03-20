import React, {Component}                   from 'react';

import {presets, StaggeredMotion, TransitionMotion, Motion, spring} from 'react-motion';
//
//import tweenState from 'react-tween-state';

//const App = React.createClass({
//  mixins: [tweenState.Mixin],
//
//  getInitialState: function() {
//    return {
//      bars: [{
//        left: 75,
//        right: 100
//      }]
//    };
//  },
//
//  componentDidMount: function() {
//    this.tweenState('left', {
//      easing: tweenState.easingTypes.easeInOutQuad,
//      duration: 500,
//      endValue: this.state.left === 0 ? 400 : 0
//    });
//  },
//
//  render: function() {
//
//    return (
//      <div className="live-component">
//        <svg width="100%" height="100%" viewBox="0 0 100 100">
//          <g transform="translate(0,0)">
//            <rect x="0" y="0" height="5" width="50" fill="white"/>
//          </g>
//          <g transform="translate(50,0)">
//            <rect x="0" y="0" height="5" width="50" fill="white"/>
//          </g>
//
//        </svg>
//      </div>
//    );
//  }
//});

const BarLeft = ({progress}) => (
  <Motion defaultStyle={{p: 0}} style={{p: spring(progress, presets.wobbly)}}>
    { ({p}) => (
      <div className="bar">
        <div className="bar__text bar__text--left">{p.toFixed(0)} %</div>
        <div className="bar__wrapper">
          <div className="bar__empty" style={ { width: (100-p) + '%'} }/>
          <div className="bar__container" style={ { width: p + '%'} }/>
        </div>
      </div>
    )
    }
  </Motion>
);

const BarRight = ({progress}) => (
  <Motion defaultStyle={{p: 0}} style={{p: spring(progress, presets.wobbly)}}>
    { ({p}) => (
      <div className="bar">
        <div className="bar__wrapper">
          <div className="bar__container" style={ { width: p + '%'} }/>
        </div>
        <div className="bar__text">{p.toFixed(0)} %</div>
      </div>
    )
    }
  </Motion>
);

export default class extends Component {

  render() {

    return <div className="live-component">
      <div className="row">
        <BarLeft progress={60}/>
        <BarRight progress={90}/>
      </div>
      <div className="achievement">
        POSESSION
      </div>
      <div className="row">
        <BarLeft progress={80}/>
        <BarRight progress={20}/>
      </div>
      <div className="achievement">
        DUELS WON
      </div>
      <div className="row">
        <BarLeft progress={45}/>
        <BarRight progress={55}/>
      </div>
      <div className="achievement">
        SHOTS On GOAL
      </div>
    </div>
  }
}

//
//<svg>
//  <Motion defaultStyle={{x: 0}} style={{x: spring(width, presets.wobbly)}}>
//    { value => (
//      <g>
//        <rect width={value.x} height="30" x="0" y="0" fill="red" />
//        <path transform={`translate(${value.x},0)`} fill="red" d="M0 0 L0 30 L30 30 L0 15 L30 0 Z" />
//      </g>
//    )
//    }
//  </Motion>
//</svg>


//<svg width="400px" height="800px">
//  <g>
//    <rect className="bar bar--1" y="0" height="20" width="200"/>
//  </g>
//
//  <g transform="scale(0.1 1)">
//    <rect y="40" className="bar bar--2" height="20"/>
//  </g>
//
//  <g transform="scale(0.8 1)">
//    <rect y="80" className="bar bar--3" height="20"/>
//  </g>
//
//</svg>
