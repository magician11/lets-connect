import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Grid, Well, Button, Image } from 'react-bootstrap';

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
        <Row>
          <Col xs={8}>
            <h1>Hi {user.displayName.split(' ')[0]}!</h1>
          </Col>
          <Col xs={4}>
            <Image src={user.photoURL} rounded className="pull-right" />
          </Col>
        </Row>
        <br />
        <p>This app allows you to connect with people around you.</p>
        <p>Would you like to:</p>
        <ol>
          <li>share your location so people come to you, or</li>
          <li>view who else wants to connect and potentially go to them?</li>
        </ol>
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
