import React, { Component } from 'react';
import { Grid, Alert } from 'react-bootstrap';

import facebookAuth from '../modules/facebook-authentication';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedOut: false,
    };
  }

  componentDidMount() {
    facebookAuth.signOut()
    .then(() => {
      this.setState({ signedOut: true });
    });
  }

  render() {
    let content;
    if (!this.state.signedOut) {
      content = (<Alert bsStyle="info">
        Logging out...
      </Alert>);
    } else {
      content = (<Alert bsStyle="info">
        You're all logged out.
      </Alert>);
    }

    return (
      <Grid>
        {content}
      </Grid>
    );
  }
}

export default Logout;
