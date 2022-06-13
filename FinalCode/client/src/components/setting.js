/**
 * PROGRAM setting.js - Program for personalization
 * PROGRAMMER: CHAN, Man Ho
 * VERSION 1.0.0: written Apr 9, 2022
 * PURPOSE: To let user personalize his own account, including changing theme, uploading profile photo and resetting passwords
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from './navbar';
import Logout from './logout';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          icon: '',
          old_password: '',
          new_password: ''
        };
    }

    light = -1;
    color = "white";

    componentDidMount = () => {
        const element = document.getElementById('hide_name');
        if (element) {
            this.setState({
                username: element.innerHTML
            });
        }
    }

    flag = 0;

    setTheme(theme) {//set theme
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


    handlebuttonchange(light1) {//change theme(button)
        if (light1 === 1){//if day theme
            this.light = -1;
            this.color = "white";
            this.setTheme("day");
        }
        else if (light1 === -1){//if dark theme
            this.light = 1;
            this.color = "dark";
            this.setTheme("night");
        }
        
        const payload = {
            username: this.state.username,
            theme: this.light
        }

        if (payload.body !== '') {//record the user's theme
            axios({
                url: '/users/updatetheme',
                method: 'PUT',
                data: payload
            })
            .then(() => {
                console.log('Data has been sent to the server.');
            })
            .catch(() => {
                console.log('Internal server error.');
            });
        }

    }

    handleImageChaneg = (e) => {//change icon
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

    clickButton = (e) => {//upload photo button
        const element = document.getElementById("upload_button");
        if (element) {
            element.click();
        }
    }

    submit = (e) => {//upload new icon
        var data = new FormData();
        data.append("file", this.state.icon);
        console.log(this.state.icon);
        axios.post("http://localhost:8080/upload/"+this.state.username, data, {})
        .then(res => {
            console.log(res.statusText)
        });

        const payload = {
            username: this.state.username,
            photo: this.state.username + ".jpg"
        };

        if (payload.body !== '') {

            axios({
                url: '/users/uploadphoto',
                method: 'PUT',
                data: payload
            })
            .then(() => {
                console.log('Data has been sent to the server.');
            })
            .catch(() => {
                console.log('Internal server error.');
            });
        }
    }

    initialSwitch = () => {//initialize the theme switch according to user's theme record in db
        const { username } = useParams();
        axios.get('/users/' + username)
        .then((response) => {
            const data = response.data[0];
            this.light = data.theme;

            const element = document.getElementById("theme_button");
            if (element) {
                if (this.light === 1) {
                    this.setTheme("night");
                    element.checked = true;
                }
                else {
                    this.setTheme("day");
                }
            }

        })
        .catch((err) => {
            console.log(err);
        });

    }

    returnCurrentUser = () => {//return current user
        const { username } = useParams();
        const hide_name = username;
        return (
            <div id='hide_name'>{hide_name}</div>
        );
    }

    showPasswordPage = () => {//show password page
        const element = document.getElementById("password_page");
        if (element) {
            element.style.display = "block";
        }
    }

    closePasswordPage = () => {//close password page
        const opwd = document.getElementById("old_pwd");
        if (opwd) {
            opwd.value = "";
        }

        const npwd = document.getElementById("new_pwd");
        if (npwd) {
            npwd.value = "";
        }

        const element = document.getElementById("password_page");
        if (element) {
            element.style.display = "none";
        }

        this.setState({
            old_password: '',
            new_password: ''
        });
    }

    handleOpwdChange = (e) => {//handle old password bar change
        this.setState({
            old_password: e.target.value
        });

    }

    handleNpwdChange = (e) => {//handle new password bar change
        this.setState({
            new_password: e.target.value
        });

    }

    submitpwd = () => {//submit new password(update passoword)

        if (this.state.new_password === '') {
            alert("New password can not be empty!");
            return;
        }


        axios.get('/users/' + this.state.username)
            .then((response) => {
                const data = response.data[0];
                if (this.state.old_password === data.password) {

                    const payload = {
                        username: this.state.username,
                        password: this.state.new_password
                    };

                    axios({
                        url: '/users/updatepwd',
                        method: 'PUT',
                        data: payload
                    })
                    .then(() => {
                        console.log("Password is updated.");
                        
                        alert("Password is updated.");
                        this.closePasswordPage();
                    })
                    .catch(() => {
                        console.log("Fail to update password.");
                        
                        alert("Fail to update password. Pleace try again.");
                        this.setState({
                            old_password: '',
                            new_password: ''
                        });
    
                        const opwd = document.getElementById("old_pwd");
                        if (opwd) {
                            opwd.value = "";
                        }
    
                        const npwd = document.getElementById("new_pwd");
                        if (npwd) {
                            npwd.value = "";
                        }
                    });

                }
                else {
                    
                    alert("Current password is incorrect!");
                    this.setState({
                        old_password: '',
                        new_password: ''
                    });

                    const opwd = document.getElementById("old_pwd");
                    if (opwd) {
                        opwd.value = "";
                    }

                    const npwd = document.getElementById("new_pwd");
                    if (npwd) {
                        npwd.value = "";
                    }

                    return;
                }
            })
            .catch(() => {
                
                alert("Fail to update password. Pleace try again.");
                this.setState({
                    old_password: '',
                    new_password: ''
                });

                const opwd = document.getElementById("old_pwd");
                if (opwd) {
                    opwd.value = "";
                }

                const npwd = document.getElementById("new_pwd");
                if (npwd) {
                    npwd.value = "";
                }
            });
    }

    loadPage = () => {//load style
        const load = document.getElementById("loading_page");
        if (load) {
            load.style.display = "block";
        }
        
    }

    finishLoad = () => {//finish load style
        const load = document.getElementById("loading_page");
        if (load) {
            load.style.display = "none";
        }
    }

    leavepwd = () => {//close password page
        const t = this;
        window.onclick = function(event) {
            if (event.target === document.getElementById("password_page")) {
                t.closePasswordPage();
            }
        }
    }

    click_logout = () => {//click logout
        localStorage.clear();
        window.location.replace("/");
    }

    render() {

        return (
            <div>
                <Navbar />
                <this.returnCurrentUser />
                <this.leavepwd/>
                <div className="main">
                    <h1>Settings</h1>
                    <input type="file" accept="image/*" id="upload_button" onChange={this.handleImageChaneg}/>
                    <div id="image_show" onClick={this.clickButton}>
                        <img id="uploaded_image" alt=""/>
                    </div>
                    <p>Click the circle to upload profile photo</p>
                    <button className="submit_button" onClick={this.submit}>Confirm</button>
                    <h1></h1>
                    <hr />
                    <h1></h1>

                    <label className="switch">
                    <span id="darkmode_text">Dark&nbsp;mode</span>
                    <input type="checkbox" id="theme_button" onChange={() => this.handlebuttonchange(this.light)} />
                    
                    <span className="slider round"></span>
                    </label>

                    <h1></h1>
                    <hr/>
                    <h1></h1>

                    <div>
                        <button type="button" className="submit_button" id="password_button" onClick={this.showPasswordPage}>
                        Change Password
                        </button>
                        <button type="button" className="submit_button" id="logout_button_link" onClick={this.click_logout}>
                        Logout
                        </button>
                    </div>
                    <div id="password_page">
                        <div id="password_menu">
                            <div id="password_field">
                                <fieldset>
                                <legend><h2 id="pwd_legend">Change Password</h2></legend>
                                <div>
                                    <input type="password" id="old_pwd" placeholder="Current Password" onChange={this.handleOpwdChange} />
                                </div>
                                <h1></h1>
                                <div>
                                    <input type="password" id="new_pwd" placeholder="New Password" onChange={this.handleNpwdChange} />
                                </div>
                                <h1></h1>
                                <div>
                                    <button type="button" className="submit_button" id="password_cancel" onClick={this.closePasswordPage}>
                                        Cancel
                                    </button>
                                    <button type="button" className="submit_button" id="password_enter" onClick={this.submitpwd}>
                                        Enter
                                    </button>
                                </div>
                                </fieldset>
                                
                            </div>
                        </div>
                    </div>

                </div>
                <Logout />
                <this.initialSwitch />
            </div>
        );
    }
}

export default Setting;
