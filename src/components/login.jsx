import React from 'react';
import { Button } from 'react-bootstrap';
import '../styling/login.css';
import { fbLogin } from '../modules/firebase';

import Heart from '../svgs/heart';
import FacebookIcon from '../svgs/facebook';

const Login = () =>
(
  <div className='login'>
    <Heart className='heart-svg' />
    <h1>Connect With People</h1>
    <Button bsSize="large" onClick={() => fbLogin()}><FacebookIcon /> Sign in with Facebook</Button>
  </div>
);

export default Login;
