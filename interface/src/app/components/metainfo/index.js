import React, { Component } from 'react';
import { mouseTrap } from 'react-mousetrap';

class Metainfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 'small'
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

    return (
      <div className='metainfo'>
        <div className={`info-block ${this.state.size}`}>
          info
        </div>
      </div>
    );
  }
}

export default mouseTrap(Metainfo);
