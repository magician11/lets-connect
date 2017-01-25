import React, { Component } from 'react';
import { Grid, Alert, Panel, Glyphicon, FormGroup, FormControl, ControlLabel, Image, Well, Button } from 'react-bootstrap';

import facebookAuth from '../modules/facebook-authentication';

class Broadcast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      reason: '',
      duration: '',
    };

    this.user = facebookAuth.getCurrentUser();
    this.updateInput = this.updateInput.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({ location });
    });
  }

  updateInput(e) {
    this.setState({ [e.target.id]: e.target.value });
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
        <Grid>
          <h1>Hey {this.user.displayName.split(' ')[0]}!</h1>
          <p>Great, we have you.</p>
          <Image src={`https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=18&size=550x330&key=AIzaSyAahNfXYiI0xosKqGiwYJhecBhLQO0kTOQ`} alt={`Map Position of ${this.user.displayName}`} thumbnail responsive />
          <h2>Almost there..</h2>
          <p>Just a couple more bits of info we need before we share your location.</p>
          <Well>
            <form>
              <FormGroup controlId="reason">
                <ControlLabel>Share why you would like to connect with others.</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.reason}
                  placeholder="e.g. I'd like to co-work with others."
                  onChange={this.updateInput}
                />
              </FormGroup>
              <FormGroup controlId="duration">
                <ControlLabel>How much longer are you going to be here for?</ControlLabel>
                <FormControl
                  componentClass="select"
                  onChange={this.updateInput}
                >
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="5 hours">5 hours</option>
                  <option value="6 hours">6 hours</option>
                  <option value="7 hours">7 hours</option>
                  <option value="8 hours">8 hours</option>
                </FormControl>
              </FormGroup>
            </form>
          </Well>
          <p>Here is the data we will broadcast.</p>
          <Panel>
            <dl className="dl-horizontal">
              <dt>Image</dt>
              <dd><img src={this.user.photoURL} alt={this.user.displayName} /></dd>
              <dt>Name</dt>
              <dd>{this.user.displayName}</dd>
              <dt>Intention</dt>
              <dd>{this.state.reason}</dd>
              <dt>Email address</dt>
              <dd>{this.user.email}</dd>
              <dt>Location</dt>
              <dd>{latitude}, {longitude}</dd>
              <dd><sup>*</sup>accurate to within {accuracy} meters</dd>
              <dt>Minimum duration</dt>
              <dd>{this.state.duration}</dd>
            </dl>
          </Panel>
          <Well className="text-center">
            <h2>Ready?</h2>
            <p>Have you checked your details above?</p>
            <Button bsStyle="primary" bsSize="large" block>
              <Glyphicon glyph="send" /> Share My Location
            </Button>
          </Well>
        </Grid>
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
