import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Layout(props) {
  const { children } = props;
  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">ZkLottery</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Lottery</Nav.Link>
            <Nav.Link href="/me">My Lottery</Nav.Link>
          </Nav>
          <ConnectButton />
        </Container>
      </Navbar>
      <Container className="py-4">{children}</Container>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
