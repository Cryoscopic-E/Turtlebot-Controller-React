import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

class Header extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Navbar bg="light" expand="md">
          <Container>
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
