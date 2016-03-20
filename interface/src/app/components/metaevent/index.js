import React, { Component } from 'react';
import { mouseTrap } from 'react-mousetrap';
import socketIOClient from 'socket.io-client';

export const socket = socketIOClient.connect('http://127.0.0.1:3000', {path: '/ws'});
export const emit = socket.emit.bind(socket);

const EVENTS = {
  'yellowcard': 'static/videos/gelbe_karte.webm',
  'goal': 'static/videos/tor.webm'
}
let mounted = false;

class MetaEvent extends Component {
  constructor(props) {
    super(props);

    socket.on('pushYellowCardsToGame', () => {
      this.setState({showEvent: 'yellowcard'})
      setTimeout(() => this.setState({showEvent: false}), 10000);
    })

    socket.on('pushTorToGame', () => {
      this.setState({showEvent: 'goal'})
      setTimeout(() => this.setState({showEvent: false}), 10000);
    })

    this.state = {
      size: 'small',
      videoPlay: false,
      showEvent: false
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

    if(this.props.duration) {
      setTimeout(() => {
        this.props.onPlayed ? this.props.onPlayed() : null;
      }, this.props.duration)
    }

    return (
      <div className='metaevent'>
        <div className={`info-block ${this.state.size}`}>
          { this.state.videoPlay ? (
            <video className='active-video' src={this.props.source} autoPlay>
              <source  type="video/mp4" />
              Your browser doesn't support HTML5 video tag.
            </video>
          ) : ( null )}

          { this.state.showEvent ? (
            <video className='active-video' src={EVENTS[this.state.showEvent]} autoPlay>
              <source  type="video/mp4" />
              Your browser doesn't support HTML5 video tag.
            </video>
          ) : (null) }
        </div>
      </div>
    );
  }
}

export default mouseTrap(MetaEvent);
