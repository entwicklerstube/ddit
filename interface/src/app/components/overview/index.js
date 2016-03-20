import React, { Component } from 'react';
import Tile from '../tile';
import View from '../view';
import { mouseTrap } from 'react-mousetrap';


export default class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTileID: 0,
      showDashboard: false,
      tiles: [{
        cover: 'static/images/tiles/bayern-juventus.png'
      },{
        cover: 'static/images/tiles/football.png'
      },{
        cover: 'static/images/tiles/teletubby.png'
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
      this.props.onTileChoose(this.state.activeTileID);
    })
  }

  render() {
    return (
      <div className='overview'>
        <div className='wrapper'>
          { this.state.tiles.map( (tile, i) => <Tile key={i} active={this.state.activeTileID === i ? 0 : 1} { ...tile } /> ) }
        </div>
      </div>
    );
  }
}

export default mouseTrap(Overview);
