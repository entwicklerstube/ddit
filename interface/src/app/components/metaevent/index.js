import React, { Component } from 'react';
import { mouseTrap } from 'react-mousetrap';

import socketIOClient from 'socket.io-client';

export const socket = socketIOClient.connect({path: '/ws'});
export const emit = socket.emit.bind(socket);

class MetaEvent extends Component {
  constructor(props) {
    super(props);

    socket.on('pushTorToGame', () => {
      console.log('pushTorToGame');
    })

    this.state = {
      size: 'small',
      videoPlay: false
    }
  }

  componentWillMount() {
    this.props.bindShortcut('up', () => {
      console.log('up');
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
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default mouseTrap(MetaEvent);
