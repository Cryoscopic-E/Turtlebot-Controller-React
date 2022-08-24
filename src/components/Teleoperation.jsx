import React, { Component } from "react";
import { Joystick, } from "react-joystick-component";
import Config from "../scripts/config";
import { Card, Button } from "react-bootstrap"

class Teleoperation extends Component {
  state = {
    connected: false,
    ros: null,
  };

  componentDidMount() {
    this.init_connection();

    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();

    this.state.ros.on("connection", () => {
      console.log("Connection established Teleop");
      this.setState({ connected: true });
    });

    this.state.ros.on("close", () => {
      console.log("Connection closed Teleop");
      this.setState({ connected: false });

      // Try Reconnect
      setTimeout(() => {
        try {
          console.log("Trying to reconnect Teleop");
          this.state.ros.connect(
            `ws://${Config.ROSBRIDGE_IP_SERVER}:${Config.ROSBRIDGE_SERVER_PORT}`
          );
        } catch (error) {
          console.log("Connection Error Teleop");
        }
      }, Config.RECONNECTION_TIMER);
    });

    try {
      this.state.ros.connect(
        `ws://${Config.ROSBRIDGE_IP_SERVER}:${Config.ROSBRIDGE_SERVER_PORT}`
      );
    } catch (error) {
      console.log("Connection Error");
    }
  }

  handleMove(e) {
    const cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.CMD_VEL_TOPIC_NAME,
      messageType: Config.CMD_VEL_MSG_TYPE,
    });

    const twist = new window.ROSLIB.Message({
      linear: {
        x: e.y / 100,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -e.x / 100,
      },
    });
    cmd_vel.publish(twist);
  }

  handleStop(e) {
    const cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: Config.CMD_VEL_TOPIC_NAME,
      messageType: Config.CMD_VEL_MSG_TYPE,
    });

    const twist = new window.ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    cmd_vel.publish(twist);
  }

  joyOptions = {
    mode: 'semi',
    catchDistance: 600,
    color: 'white'
  }

  containerStyle = {
    border: "5px solid #c3c3c3",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    background: 'linear-gradient(to left, #E684AE, #12DACA, #77F3D3)'
  }

  divStyle={
    marginInLine: "auto"
  }

  render() {
    return (

      <Card className="text-center" style={{ width: '12rem' }}>
        <Card.Header className="lead mb-4">Control</Card.Header>
        <div className="card-body">
          <div id="joy-container">
          <Joystick
          className="dwwf"
          style={this.divStyle}
            size={100}
            baseColor="lightgray"
            stickColor="gray"
            move={this.handleMove}
            stop={this.handleStop}
          ></Joystick>
          </div>

          <Button className="btn-danger mt-5">Emergency Stop</Button>
        </div>
      </Card>


    );
  }
}

export default Teleoperation;
