import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class People extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <h1>These are people..</h1>
      </Grid>
    );
  }
}

export default People;
