import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Logout from './logout';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          light: -1,
          color: "white",
          username: '',
          icon: null
        };
    }

    setTheme(theme) {
        if (theme === "day"){
            document.documentElement.style
            .setProperty("--main-color", "white");
            document.documentElement.style
            .setProperty("--text-color", "black");
            document.documentElement.style
            .setProperty("--typecomment-color", "#3085e0");
            document.documentElement.style
            .setProperty("--sidebar-color", "rgb(215, 215, 215)");
            document.documentElement.style
            .setProperty("--home-color", "rgb(0, 128, 124)");
        }
        if (theme === "night"){
            document.documentElement.style
            .setProperty("--main-color", "rgb(48, 48, 48)");
            document.documentElement.style
            .setProperty("--text-color", "rgb(182, 182, 182)");
            document.documentElement.style
            .setProperty("--typecomment-color", "grey");
            document.documentElement.style
            .setProperty("--sidebar-color", "grey");
            document.documentElement.style
            .setProperty("--home-color", "rgb(0, 128, 124)");
        }
    }


    handlebuttonchange(light1) {
        if (light1 === 1){
            this.setState({light: -1});
            this.setState({color: "white"});
            this.setTheme("day");
        }
            
        if (light1 === -1){
            this.setState({light: 1});
            this.setState({color: "dark"});
            this.setTheme("night");
        }
        console.log(this.light);
    }
    // state = {
    //     username: '',
    //     icon: null
    // }

    handleImageChaneg = (e) => {
        if (e.target.files) {
            this.setState({
                icon: e.target.files[0]
            });

            const read = new FileReader();
            read.onload = () => {
                const url = read.result;
                const img = document.getElementById("uploaded_image");
                img.src = url;
            }
            read.readAsDataURL(e.target.files[0]);
        }
    }

    clickButton = (e) => {
        const element = document.getElementById("upload_button");
        if (element) {
            element.click();
        }
    }

    submit = (e) => {
        if (this.state.icon) {
            var data = new FormData();
            data.append("file", this.state.icon);
            console.log(this.state.icon);
            axios.post("http://localhost:8080/upload", data, {})
            .then(res => {
                console.log(res.statusText)
            })
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Settings</h1>
                    <form>
                    <input type="file" accept="image/*" id="upload_button" onChange={this.handleImageChaneg}/>
                    <div id="image_show" onClick={this.clickButton}>
                        <img id="uploaded_image" />
                    </div>
                    <p>Click to upload profile photo</p>
                    <button type="button" className="submit_button" onClick={this.submit}>Confirm</button>
                    </form>
                    <h1></h1>
                    <label className="switch">
                    <input type="checkbox" onChange={() => this.handlebuttonchange(this.state.light)}/>
                    
                    <span className="slider round"></span>
                    </label>
                </div>
                <Logout />

            </div>
        );
    }
}

export default Setting;