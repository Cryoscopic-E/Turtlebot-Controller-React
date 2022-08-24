import React, { Component } from "react";
import { Container } from "react-bootstrap";
class Footer extends Component {
  state = {};
  render() {
    return (
      <Container className="mt-5">
        <p className="text-center">CryoLabs &copy; 2022</p>
      </Container>
    );
  }
}

export default Footer;
