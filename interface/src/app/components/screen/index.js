import React, { Component } from 'react';

export default class extends Component {
  render() {

    const inlineStyling = {
      backgroundImage: `url("${this.props.cover}")`
    }

    return (
      <div className='pitch-screen' style={inlineStyling}>

        { this.props.video ? (
          <video className='active-video' src={this.props.video} autoPlay>
            <source  type="video/mp4" />
            Your browser doesn't support HTML5 video tag.
          </video>
        ) : (
          null
        )}

        <div className='children'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
