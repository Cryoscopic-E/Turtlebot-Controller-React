const Config = {
  ROSBRIDGE_IP_SERVER: "192.168.0.24",
  ROSBRIDGE_SERVER_PORT: "9090",
  RECONNECTION_TIMER: 3000,
  CMD_VEL_TOPIC_NAME: "/cmd_vel",
  CMD_VEL_MSG_TYPE: "geometry_msgs/Twist",
};

export default Config;
