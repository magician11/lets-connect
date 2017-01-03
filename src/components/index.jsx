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
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    if (response.name) {
      this.setState({ name: response.name, image: response.picture.data.url });
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
      login = (
        <Panel>
          <h1><img src={this.state.image} alt={this.state.name} /> {this.state.name}</h1>
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
