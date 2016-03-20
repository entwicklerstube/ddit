import React                                          from 'react';
import {render}                                       from 'react-dom';
import { Router, Route, browserHistory, IndexRoute }  from 'react-router'

import Frame from './frame';
import App from './containers/app';

import Pitch from './containers/pitch';
import LiveComponent from './containers/live-component';

require('./app.scss');

render((
  <Router history={browserHistory}>
    <Route name="app" path="/" component={Frame}>
      <IndexRoute component={App}/>
      <Route path='/pitch' component={Pitch}/>
      <Route path='/live-component' component={LiveComponent}/>
    </Route>
  </Router>
), document.getElementById('react-app'));
