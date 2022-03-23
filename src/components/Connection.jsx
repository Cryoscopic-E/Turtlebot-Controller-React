import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Config from "../scripts/config";

class Connection extends Component {
  state = {
    connected: false,
    ros: null,
  };

  componentDidMount() {
    this.init_connection();
  }

  init_connection() {
    this.state.ros = new window.ROSLIB.Ros();

    this.state.ros.on("connection", () => {
      console.log("Connection established");
      this.setState({ connected: true });
    });

    this.state.ros.on("close", () => {
      console.log("Connection closed");
      this.setState({ connected: false });

      // Try Reconnect
      setTimeout(() => {
        try {
          console.log("Trying to reconnect");
          this.state.ros.connect(
            `ws://${Config.ROSBRIDGE_IP_SERVER}:${Config.ROSBRIDGE_SERVER_PORT}`
          );
        } catch (error) {
          console.log("Connection Error");
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

  render() {
    return (
      <Alert
        variant={this.state.connected ? "success" : "danger"}
        className="text-center m-3"
      >
        {this.state.connected ? "Robot Connected" : "Robot Disconnected"}
      </Alert>
    );
  }
}

export default Connection;
