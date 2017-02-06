import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Alert, Panel, FormGroup, FormControl, ControlLabel, Image, Well, Button } from 'react-bootstrap';
import Loader from './loader';
import { saveBroadcast } from '../modules/firebase';

class Broadcast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      reason: '',
      duration: '1 hour',
      broadcastComplete: false,
      broadcasting: false,
    };

    this.updateInput = this.updateInput.bind(this);
    this.broadcast = this.broadcast.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({ location });
    });
  }

  broadcast() {
    this.setState({broadcasting: true});
    saveBroadcast({user: this.props.user, location: this.state.location, reason: this.state.reason, duration: this.state.duration})
    .then(() => this.setState({broadcastComplete: true, broadcasting: false}));
  }

  updateInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    let content;

    if (this.state.broadcasting) {
      content = <Loader loaderStatus='Broadcasting your data now' />;
    } else if (this.state.broadcastComplete) {
      content =
      (
        <div>
          <Alert bsStyle="success">
            <i className="fa fa-check-square-o" aria-hidden="true"></i> <strong>Great!</strong> Your broadbast is now out there :)
          </Alert>
          <p className="text-center"><Link to="/">Back to dashboard</Link></p>
        </div>
      );
    }
    else if (!this.state.location) {
      content = <Loader loaderStatus='Calculating your location' />;
    } else {
      const { latitude, longitude, accuracy } = this.state.location.coords;
      content = (
        <div>
          <h1>Hey {this.props.user.displayName.split(' ')[0]}!</h1>
          <p>Great, we have you.</p>
          <Image src={`https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=18&size=550x330&key=AIzaSyAahNfXYiI0xosKqGiwYJhecBhLQO0kTOQ`} alt={`Map Position of ${this.props.user.displayName}`} thumbnail responsive />
          <h2>Almost there..</h2>
          <p>We need just a couple more bits of info before we share your location.</p>
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
                  value={this.state.duration}
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
          { this.state.reason && this.state.duration &&
            <div>
              <p>Here is the data we will broadcast.</p>
              <Panel>
                <dl className="dl-horizontal">
                  <dt>Image</dt>
                  <dd><img src={this.props.user.photoURL} alt={this.props.user.displayName} /></dd>
                  <dt>Name</dt>
                  <dd>{this.props.user.displayName}</dd>
                  <dt>Intention</dt>
                  <dd>{this.state.reason}</dd>
                  <dt>Email address</dt>
                  <dd>{this.props.user.email}</dd>
                  <dt>Location</dt>
                  <dd>{latitude}, {longitude}</dd>
                  <dd><sup>*</sup>accurate to within {accuracy} meters</dd>
                  <dt>Minimum duration</dt>
                  <dd>{this.state.duration}</dd>
                </dl>
              </Panel>
              <Well className="text-center">
                <h3>Ready for some company?</h3>
                <Button bsStyle="primary" bsSize="large" block onClick={this.broadcast}>
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i> Share My Location
                </Button>
              </Well>
            </div>
          }
        </div>
        );
      }

      return (
        <Grid className="broadcast">
          {content}
        </Grid>
      );
    }
  }

  Broadcast.propTypes = {
    user: React.PropTypes.object.isRequired,
  };

  export default Broadcast;
