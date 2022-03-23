import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config";

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
        x: e.y / 50,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -e.x / 50,
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

  render() {
    return (
      <div>
        <Joystick
          size={100}
          baseColor="lightgray"
          stickColor="gray"
          move={this.handleMove}
          stop={this.handleStop}
        ></Joystick>
      </div>
    );
  }
}

export default Teleoperation;
