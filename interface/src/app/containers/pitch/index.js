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
      console.log('go back');
      this.setState({showOverview:true})
    });
  }

  onTileChoose() {
    console.log('YO TILE CHOOSe');
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
                <Screen cover='static/images/goal.gif'>
                  <Metainfo/>
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


// Video code
// <video src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" autoPlay>
//   <source  type="video/mp4" />
//   Your browser doesn't support HTML5 video tag.
// </video>
