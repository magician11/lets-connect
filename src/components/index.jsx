import React from 'react';

import Header from './header';

import facebookAuthentication from '../modules/facebook-authentication';

import styling from '../styling/index.scss';

const LetsConnect = props =>
(
  <div className={styling['lets-connect']}>
    {facebookAuthentication.isAuthenticated() ? <Header /> : '' }
    <div className={styling.body}>
      {props.children}
    </div>
  </div>
);

LetsConnect.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default LetsConnect;
