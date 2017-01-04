import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Grid, Row, Col, Image, Panel, Alert } from 'react-bootstrap';

import styling from '../styling/main.scss';

class LetsConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      emailAddress: '',
      location: null,
      status: '',
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    this.setState({
      status: 'Logged into Facebook. Calculating your location...',
      name: response.name,
      image: response.picture.data.url,
      emailAddress: response.email,
    });
    if (response.name) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.setState({ location });
      });
    }
  }

  render() {
    let content;
    if (!this.state.name) {
      content = (
        <FacebookLogin
          appId="258879151198291"
          autoLoad
          buttonStyle={{ fontSize: 22 }}
          callback={this.responseFacebook}
          icon="fa-facebook"
          scope="public_profile,user_friends"
          fields="name,email,picture"
        />
      );
    } else if (this.state.location === null) {
      content = (<Alert bsStyle="info">
        {this.state.status}
      </Alert>);
    } else {
      const { latitude, longitude, accuracy } = this.state.location.coords;
      content = (
        <Panel>
          <h1><img src={this.state.image} alt={this.state.name} /> {this.state.name}</h1>
          <p>Email Address: <a href={`mailto:${this.state.emailAddress}`}>{this.state.emailAddress}</a></p>
          <p>Position: {latitude}, {longitude} (accurate to {accuracy} meters)</p>
          <a href={`https://www.google.com/maps/search/${latitude},${longitude}`} className="text-center">
            <Image src={`https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=18&size=550x330&key=AIzaSyAahNfXYiI0xosKqGiwYJhecBhLQO0kTOQ`} alt={`Map Position of ${this.state.name}`} thumbnail responsive />
          </a>
        </Panel>
    );
  }

  return (
    <Grid className={styling['lets-connect']} fluid>
      <Row>
        <Col xs={12}>
          {content}
        </Col>
      </Row>
    </Grid>
  );
}
}

export default LetsConnect;
