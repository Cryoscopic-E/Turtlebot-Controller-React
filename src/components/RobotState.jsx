import { Component } from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";
import Config from "../scripts/config";

class RobotState extends Component {
    state = {
        ros: null,
        x: 0,
        y: 0,
        orientation: 0,
        linear_vel: 0,
        angular_vel: 0,
    }

    constructor() {
        super();
        this.state.ros = new window.ROSLIB.Ros();
        try {
            this.state.ros.connect(
                `ws://${Config.ROSBRIDGE_IP_SERVER}:${Config.ROSBRIDGE_SERVER_PORT}`
            );
        } catch (error) {
            console.log("Connection Error");
        }

    }

    componentDidMount() {
        this.robotPosition();
        this.robotVelocity();
    }

    robotPosition() {
        const pos_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.POSITION_TOPIC,
            messageType: Config.POSITION_MSG
        });

        pos_subscriber.subscribe((msg) => {
            this.setState({
                x: msg.pose.pose.position.x.toFixed(2),
                y: msg.pose.pose.position.y.toFixed(2),
                orientation: this.quaternionToEulerYaw(msg.pose.pose.orientation).toFixed(2),
            })
        });
    }

    quaternionToEulerYaw(q) {
        const sinY_cosP = 2 * (q.w * q.z + q.x * q.y);
        const cosY_cosP = 1 - 2 * (q.y * q.y + q.z * q.z);
        return Math.atan2(sinY_cosP, cosY_cosP);
    }

    robotVelocity() {
        const vel_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.VELOCITY_TOPIC,
            messageType: Config.VELOCITY_MSG
        });

        vel_subscriber.subscribe((msg) => {
            this.setState({
                linear_vel: msg.twist.twist.linear.x.toFixed(2),
                angular_vel: msg.twist.twist.angular.z.toFixed(2),
            })
        });
    }



    render() {
        return (
            <Card className="mt-4">
                <Card.Header className="lead">Position</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>X: <Badge bg="light" text="dark">
                        {this.state.x}
                    </Badge></ListGroup.Item>
                    <ListGroup.Item>Y: <Badge bg="light" text="dark">
                        {this.state.y}
                    </Badge></ListGroup.Item>
                    <ListGroup.Item>Orientation: <Badge bg="light" text="dark">
                        {this.state.orientation}
                    </Badge></ListGroup.Item>
                </ListGroup>
                <Card.Header className="lead">Velocity</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Linear: <Badge bg="light" text="dark">
                        {this.state.linear_vel}
                    </Badge></ListGroup.Item>
                    <ListGroup.Item>Angular: <Badge bg="light" text="dark">
                        {this.state.angular_vel}
                    </Badge></ListGroup.Item>
                </ListGroup>
            </Card>
        );
    }
}

export default RobotState;