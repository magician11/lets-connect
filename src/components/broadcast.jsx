import React, { Component } from 'react';
import { Grid, Alert, Panel, Image } from 'react-bootstrap';

import facebookAuth from '../modules/facebook-authentication';

class Broadcast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
    };

    this.user = facebookAuth.getCurrentUser();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({ location });
    });
  }

  render() {
    let content;
    if (!this.state.location) {
      content = (<Alert bsStyle="info">
        Calculating your location...
      </Alert>);
    } else {
      const { latitude, longitude, accuracy } = this.state.location.coords;
      content = (
        <Panel>
          <h1><img src={this.user.photoURL} alt={this.user.displayName} /> {this.user.displayName}</h1>
          <p>Email Address: <a href={`mailto:${this.user.email}`}>{this.user.email}</a></p>
          <p>Position: {latitude}, {longitude} (accurate to {accuracy} meters)</p>
          <a href={`https://www.google.com/maps/search/${latitude},${longitude}`} className="text-center">
            <Image src={`https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=18&size=550x330&key=AIzaSyAahNfXYiI0xosKqGiwYJhecBhLQO0kTOQ`} alt={`Map Position of ${this.user.displayName}`} thumbnail responsive />
          </a>
        </Panel>
    );
  }

  return (
    <Grid>
      {content}
    </Grid>
  );
}
}

export default Broadcast;
