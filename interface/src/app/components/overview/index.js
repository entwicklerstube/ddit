import React, { Component } from 'react';
import Tile from '../tile';
import { mouseTrap } from 'react-mousetrap';


export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTileID: 0,
      tiles: [{
        _active: true
      },{
        _active: false
      }]
    }
  }

  componentWillMount() {
    this.props.bindShortcut('right', () => {
      this.setState({activeTileID:1})
    })

    this.props.bindShortcut('left', () => {
      this.setState({activeTileID:0})
    })

    this.props.bindShortcut('enter', () => {
      alert(`You've choosen ID: ${this.state.activeTileID}`)
    })
  }

  render() {
    return (
      <div className='pitch-overview'>
        <div className='wrapper'>
          { this.state.tiles.map( (tile, i) => <Tile key={i} active={this.state.activeTileID === i ? 1 : 0} { ...tile } /> ) }
        </div>
      </div>
    );
  }
}

export default mouseTrap(Overview);
