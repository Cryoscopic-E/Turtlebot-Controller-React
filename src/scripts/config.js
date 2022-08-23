const Config = {
  ROSBRIDGE_IP_SERVER: "0.0.0.0",
  ROSBRIDGE_SERVER_PORT: "9090",
  RECONNECTION_TIMER: 3000,
  CMD_VEL_TOPIC_NAME: "/cmd_vel",
  CMD_VEL_MSG_TYPE: "geometry_msgs/Twist",
  POSITION_TOPIC: "/amcl_pose",
  POSITION_MSG: "geometry_msgs/PoseWithCovarianceStamped",
  VELOCITY_TOPIC: "/odom",
  VELOCITY_MSG: "nav_msgs/Odometry"
};

export default Config;
