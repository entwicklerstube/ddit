import React, {Component} from 'react';

import Overview from '../../components/overview';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='pitch'>
        <div className='tv-mock'>
          <div className='tv-screen'>
            <div className='tv-wrapper'>
              <Overview/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// Video code
// <video src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" autoPlay>
//   <source  type="video/mp4" />
//   Your browser doesn't support HTML5 video tag.
// </video>
