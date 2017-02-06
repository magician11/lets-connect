import React from 'react';
import { Link } from 'react-router';
import { Navbar, Button } from 'react-bootstrap';

import { signOut } from '../modules/firebase';

const Header = props =>
(
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Let's Connect</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {/* <Nav>
        <li>
        <Link to="/broadcast">Broadcast Your Location</Link>
        </li>
        <li>
        <Link to="/people">View Map Of Broadcasts</Link>
        </li>
      </Nav> */}
      <Navbar.Text pullRight>
        {props.user.displayName} <Button bsSize="xsmall" bsStyle="link" onClick={() => signOut()}>(log out)</Button>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default Header;
