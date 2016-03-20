import React, {Component} from 'react';
import { mouseTrap } from 'react-mousetrap';

import Overview from '../../components/overview';
import Screen from '../../components/screen';
import MetaEvent from '../../components/metaevent';

export default class Pitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOverview: true,
      activeVideo: 0,
      videos: [{
        delay: 2000,
        duration: 5000,
        source: 'static/videos/tor.webm',
        onPlayed: this.bayernJuventusVideoDone.bind(this),
        video: 'static/videos/bayernjuventus.mp4'
      },{
        video: 'static/videos/gntm.mp4'
      }]
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

  bayernJuventusVideoDone() {
    console.log('use next video');
    this.setState({activeVideo:1})
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
                <Screen video={this.state.videos[this.state.activeVideo].video}>
                  <MetaEvent {...this.state.videos[this.state.activeVideo]} />
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
