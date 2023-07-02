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
          <Navbar.Brand href="#home">ZkLottery</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <ConnectButton />
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
