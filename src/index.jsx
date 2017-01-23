import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import facebookAuthentication from './modules/facebook-authentication';

import LetsConnect from './components/index';
import Home from './components/home';
import Login from './components/login';
import Logout from './components/logout';
import Broadcast from './components/broadcast';
import ViewPeople from './components/people';

require('bootstrap/dist/css/bootstrap.css');

facebookAuthentication.init();

/*
Check if the user is authenticated with Facebook before continuiing.

If they are not authenticated, send them to the login page and include
where to send them post authentication.
*/
const requireAuth = (nextState, replace) => {
  // console.log(`Checking auth for ${nextState.location.pathname}`);
  // console.log(facebookAuthentication.getCurrentUser());
  if (!facebookAuthentication.isAuthenticated()) {
    replace({ pathname: '/login', state: { nextPathname: nextState.location.pathname } });
  }
};

ReactDOM.render((<Router history={browserHistory}>
  <Route path="/" component={LetsConnect}>
    <IndexRoute component={Home} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="broadcast" component={Broadcast} onEnter={requireAuth} />
    <Route path="people" component={ViewPeople} onEnter={requireAuth} />
  </Route>
</Router>
), document.querySelector('#app'));
