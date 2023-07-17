import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AlertToast } from './common/popup';
import { useAtom } from 'jotai';
import { globalAtom } from '../model';

function Layout(props) {
  const { children } = props;
  const [toast, setErrorToast] = useAtom(globalAtom.errorToast);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">ZkLottery</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Lottery</Nav.Link>
            <Nav.Link href="/my-lotteries">My Lottery</Nav.Link>
          </Nav>
          <ConnectButton />
        </Container>
      </Navbar>
      <Container className="py-4">
        {children}
        <AlertToast
          show={toast.show}
          variant="danger"
          timeout={2000}
          content={toast.message}
          onClose={() => setErrorToast((prev) => ({ ...prev, show: false }))}
        />
      </Container>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
