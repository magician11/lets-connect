import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import facebookAuth from '../modules/facebook-authentication';

const Header = () => {
  const user = facebookAuth.getCurrentUser();

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Let's Connect</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/broadcast">
            <NavItem>Broadcast</NavItem>
          </LinkContainer>
          <LinkContainer to="/people">
            <NavItem eventKey={2}>Map</NavItem>
          </LinkContainer>
        </Nav>
        <Navbar.Text pullRight>
          {user.displayName} (<Link to="logout">logout</Link>)
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
);
};

export default Header;
