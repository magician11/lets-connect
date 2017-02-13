import React from 'react';
import { Link }  from 'react-router';
import { Row, Col, Grid, Well, Button, Image } from 'react-bootstrap';

import '../styling/dashboard.css';

const Dashboard = props => {
return (
  <Grid className="dashboard">
    <Row>
      <Col xs={8}>
        <h1>Hi {props.user.displayName.split(' ')[0]}!</h1>
      </Col>
      <Col xs={4}>
        <Image src={props.user.photoURL} rounded className="pull-right" />
      </Col>
    </Row>
    <br />
    <p>This app allows you to connect with people around you. For more details <Link to="/faq">click here</Link>.</p>
    <p>Would you like to:</p>
    <ol>
      <li>share your location so people come to you, or</li>
      <li>view who else wants to connect and potentially go to them?</li>
    </ol>
    <Well>
      <Link to="/broadcast">
        <Button bsStyle="primary" bsSize="large" block>Share My Location</Button>
      </Link>
      <Link to="/people">
        <Button bsStyle="primary" bsSize="large" block className="top-margin">See Where Others Are</Button>
      </Link>
    </Well>
  </Grid>
);
}

// const Dashboard = props => {
// console.log(props);
//
// return <h1>Dashboard</h1>;
// };

// Home.propTypes = {
//   isAuthenticated: React.propTypes.bool.isRequired,
//   user: React.propTypes.node,
// };

export default Dashboard;
