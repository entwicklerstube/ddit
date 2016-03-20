import React, { Component } from 'react';
import { mouseTrap } from 'react-mousetrap';
import socketIOClient from 'socket.io-client';

import LiveComponent from '../../containers/live-component';

export const socket = socketIOClient.connect('http://127.0.0.1:3000', {path: '/ws'});
export const emit = socket.emit.bind(socket);

const EVENTS = {
  'yellowcard': {
    src: 'static/videos/gelbe_karte.webm',
    duration: 10000
  },
  'goal': {
    src: 'static/videos/tor.webm',
    duration: 5000
  },
  'sun': {
    src: 'static/videos/sun.webm',
    duration: 5000
  },
  'suggestion': {
    src: 'static/videos/racer.webm',
    duration: 6000
  }
}
let mounted = false;

class MetaEvent extends Component {
  constructor(props) {
    super(props);

    socket.on('pushYellowCardsToGame', () => {
      // this.setState({showEvent: 'yellowcard'})
      this.setState({showEventComponent: true, showEvent: false})
    })

    socket.on('pushTorToGame', () => {
      this.setState({showEvent: 'goal', showEventComponent: false})
    })

    socket.on('pushAbseitsToGame', () => {
      this.setState({showEvent: 'sun', showEventComponent: false})
    })

    socket.on('pushEckenToGame', () => {
      this.setState({showEvent: 'suggestion', showEventComponent: false})
    })

    this.state = {
      size: 'small',
      videoPlay: false,
      showEvent: false,
      showEventComponent: false
    }
  }

  componentWillUnmount() {
    mounted = false;
  }


  componentWillMount() {
    mounted = true;
    this.props.bindShortcut('up', () => {
      this.setState({
        size: 'big'
      })
    })

    this.props.bindShortcut('down', () => {
      console.log('down');
      this.setState({
        size: 'small'
      })
    })
  }

  render() {

    if(this.props.delay) {
      setTimeout(() => {
        this.setState({videoPlay: true})
      }, this.props.delay)
    }

    if(this.props.srcDuration) {
      setTimeout(() => {
        this.props.onPlayed ? this.props.onPlayed() : null;
      }, this.props.srcDuration)
    }

    return (
      <div className='metaevent'>
        <div className='shadow-layer'></div>
        <div className={`info-block ${this.state.size}`}>
          { this.state.videoPlay ? (
            <video className='active-video' src={this.props.source} autoPlay>
              <source  type="video/mp4" />
              Your browser doesn't support HTML5 video tag.
            </video>
          ) : ( null )}

          { this.state.showEvent ? (
            <video className='active-video' src={EVENTS[this.state.showEvent].src} autoPlay>
              <source  type="video/mp4" />
              Your browser doesn't support HTML5 video tag.
            </video>
          ) : (null) }

          { this.state.showEventComponent ? (
            <LiveComponent/>
          ) : (
            null
          ) }
        </div>
      </div>
    );
  }
}

export default mouseTrap(MetaEvent);
