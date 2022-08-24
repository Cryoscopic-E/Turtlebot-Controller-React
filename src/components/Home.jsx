import React, { Component } from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import Map from "./Map";
import { Row, Col, Container } from "react-bootstrap";

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          <h1 className="text-center mt-3">Robot Control Page</h1>
          <Row>
            <Col>
              <Connection />
            </Col>
          </Row>
          <Row>
            <Col className="col-md-4">
              <Teleoperation />
              <RobotState />
            </Col>
            <Col className="col-md-8">
              <Map />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
