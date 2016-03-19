import React, {Component} from 'react';
import { mouseTrap } from 'react-mousetrap';

import Overview from '../../components/overview';
import Screen from '../../components/screen';
import Metainfo from '../../components/metainfo';

export default class Pitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOverview: true
    }
  }

  componentWillMount() {
    this.props.bindShortcut('esc', () => {
      this.setState({showOverview:true})
    });
  }

  onTileChoose() {
    this.setState({showOverview:false})
  }

  render() {
    return (
      <div className='pitch'>
        <div className='tv-mock'>
          <div className='tv-screen'>
            <div className='tv-wrapper'>
              { this.state.showOverview ? (
                <Screen cover='static/images/tv-cover.png'>
                  <Overview onTileChoose={this.onTileChoose.bind(this)}/>
                </Screen>
              ) : (
                <Screen video='static/videos/bayernjuventus.mp4'>
                  <Metainfo videoDelay={30}video='static/videos/tor.mp4'/>
                </Screen>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default mouseTrap(Pitch);
