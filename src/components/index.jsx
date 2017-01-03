import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Panel } from 'react-bootstrap';

import styling from '../styling/main.scss';

class LetsConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      location: null,
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    if (response.name) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.setState({ name: response.name, image: response.picture.data.url, location });
      });
    }
  }

  render() {
    let login;
    if (!this.state.name) {
      login = (
        <FacebookLogin
          appId="258879151198291"
          autoLoad
          buttonStyle={{ fontSize: 40 }}
          callback={this.responseFacebook}
          icon="fa-facebook"
          scope="public_profile,user_friends"
          fields="name,email,picture"
        />
      );
    } else {
      const { latitude, longitude, accuracy } = this.state.location.coords;
      login = (
        <Panel>
          <h1><img src={this.state.image} alt={this.state.name} /> {this.state.name}</h1>
          <p>Position: {latitude}, {longitude} (accurate to {accuracy} meters)</p>
          <img src={`https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=18&size=550x330`} alt={`Map Position of ${this.state.name}`} />
        </Panel>
      );
    }
    return (
      <div className={styling['lets-connect']}>
        {login}
      </div>
    );
  }
}

export default LetsConnect;
