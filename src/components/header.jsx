import React from 'react';
import { Link } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';

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
      <Navbar.Text>
        Signed in as {props.user.displayName}
      </Navbar.Text>
      <Nav pullRight>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <a href="/" onClick={() => signOut()}>Logout</a>
        </li>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default Header;
