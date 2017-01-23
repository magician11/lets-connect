import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import Heart from '../svgs/heart';
import FacebookIcon from '../svgs/facebook';

import facebookAuth from '../modules/facebook-authentication';

import styling from '../styling/login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    facebookAuth.login()
    .then((result) => {
      this.props.router.replace(this.props.location.state.nextPathname);
    })
    .catch((error) => {
      throw (error);
    });
  }

  render() {
    return (
      <div className={styling.login}>
        <Heart />
        <h1>Connect With People</h1>
        <Button bsSize="large" onClick={this.login}><FacebookIcon /> Sign in with Facebook</Button>
      </div>
    );
  }
}

export default Login;
