import React, { Component } from 'react';
import { mouseTrap } from 'react-mousetrap';

class Metainfo extends Component {
  constructor(props) {
    super(props);

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

    setTimeout(() => {
      this.setState({videoPlay: true})
    }, 2000)

    return (
      <div className='metainfo'>
        <div className={`info-block ${this.state.size}`}>
          { this.state.videoPlay ? (
            <video className='active-video' src={this.props.video} autoPlay>
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

export default mouseTrap(Metainfo);
