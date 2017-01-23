import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Well, Button, Image } from 'react-bootstrap';

import facebookAuth from '../modules/facebook-authentication';

class Home extends Component {
  constructor(props) {
    super(props);

    this.user = facebookAuth.getCurrentUser();
  }

  render() {
    const user = this.user;
    return (
      <Grid>
        <Image src={user.photoURL} rounded />
        <h1>Hi {user.displayName.split(' ')[0]}!</h1>
        <p>This app allows you to connect with people around you.</p>
        <p>Would you like to share your location or view who else wants to connect?</p>
        <Well>
          <LinkContainer to="/broadcast">
            <Button bsStyle="primary" bsSize="large" block>Share My Location</Button>
          </LinkContainer>
          <LinkContainer to="/people">
            <Button bsStyle="primary" bsSize="large" block>See Where Others Are</Button>
          </LinkContainer>
        </Well>
      </Grid>
    );
  }
}

export default Home;
