import React, { Component } from 'react'
import Config from '../scripts/config';

class Map extends Component {
    render() {
        return (
            <div>
                <div id="nav_div"></div>
            </div>
        )
    }

    state = {
        ros: null
    }

    constructor() {
        super();
    }

    componentDidMount() {
        this.init_connection();
        this.view_map();
    }

    navDimDimensions(){
        let box = document.querySelector('#nav_div');
        let width = box.offsetWidth;
        let height = (3* width)/4;
        return [width, height]
    }

    resize_map(){
        console.log("Resize map")
    }

    view_map() {
        const dim = this.navDimDimensions();
        const viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: dim[0],
            height: dim[1],
        })
        
        this.navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName: "/move_base",
            withOrientation: true,
        })
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();

        try {
            this.state.ros.connect(
                `ws://${Config.ROSBRIDGE_IP_SERVER}:${Config.ROSBRIDGE_SERVER_PORT}`
            );
        } catch (error) {
            console.log("Connection Error");
        }
    }
}

export default Map;
