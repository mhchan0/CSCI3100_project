/**
 * PROGRAM signup.js - Program for users to sign up
 * PROGRAMMER: LUI, Him
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To get users records from database and perform validation check for sign up
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import{ init, send} from '@emailjs/browser';

init("PXwTcr4WhSncAgm90");

class Signup extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        confirm_pwd: ""
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handlePwdChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleCPwdChange = (e) => {
        this.setState({
            confirm_pwd: e.target.value
        });
    }

    clearText = () => {
        this.setState({
            username: "",
            email: "",
            password: "",
            confirm_pwd: ""
        });

        const input_username = document.getElementById("input_username");
        if (input_username) {
            input_username.value = "";
        }

        const input_email = document.getElementById("input_email");
        if (input_email) {
            input_email.value = "";
        }

        const input_pwd = document.getElementById("input_pwd");
        if (input_pwd) {
            input_pwd.value = "";
        }

        const input_cpwd = document.getElementById("input_cpwd");
        if (input_cpwd) {
            input_cpwd.value = "";
        }
    }

    submit = () => {
        if (this.state.username === "") {
            alert("Username cannot be empty!");
            this.clearText();
            return;
        }
        if (this.state.email === "") {
            alert("Email cannot be empty!");
            this.clearText();
            return;
        }
        if (this.state.password === "") {
            alert("Password cannot be empty!");
            this.clearText();
            return;
        }
        if (this.state.confirm_pwd !== this.state.password) {
            alert("Passwords do not match!");
            this.clearText();
            return;
        }

        axios.get('/users/' + this.state.username)
        .then((res) => {
            let data = res.data;
            if (data.length > 0) {
                alert("Username has been used!");
                this.clearText();
                return;
            }
            else {
                axios.get('/users/findemail/' + this.state.email)
                .then((res) => {
                    data = res.data;
                    if (data.length > 0) {
                        alert("Email has been used!");
                        this.clearText();
                        return;
                    }
                    else {
                        const sendData = {
                            username: this.state.username,
                            email: this.state.email,
                            password: this.state.password,
                            usertype: -1,
                            theme: -1,
                            photo: "guest.jpg"
                        }

                        axios({
                            url: '/users/save',
                            method: 'POST',
                            data: sendData
                            })
                            .then(() => {
                              this.sendEmail();
                            })
                            .catch(() => {
                                alert("Fail to sign up. Please try again.");
                                this.clearText();
                                return;
                            });

                    }
                }).catch(() => {
                    alert("Fail to sign up. Please try again.");
                    this.clearText();
                    return;
                });

            }
        }).catch(() => {
            alert("Fail to sign up. Please try again.");
            this.clearText();
            return;
        })
    }

    sendEmail = () => {
        axios.get('/users/' + this.state.username)
        .then((res) => {
            const id = res.data[0]._id;
            const emailData = {
                username: this.state.username,
                email: this.state.email,
                link: "http://localhost:3000/verify/" + this.state.username + "/" + id
            }

            send("stockstalker", "template_8zlt66q", emailData)
            .then(() => {
                alert("Sign up successfully! Pleace check you email for verification.");
                this.clearText();
                return;
            })
            .catch(() => {
                alert("Fail to send verification email! Pleace contact our team.");
                this.clearText();
                return;
            });
        })
        .catch(() => {
            alert("Fail to send verification email! Pleace contact our team.");
            this.clearText();
            return;
        });
    }

    render() {
        return (
            <div class="login_page">
                <div class="login_field">
                    <div className="login_content">
                    <div className="login_switch">
                        <Link to={"/"} style={{ textDecoration: 'none' }}>
                        <span className="login_switcher">LOG IN</span>
                        </Link>
                        <span className="login_switcher">SIGN UP</span>

                    </div>
                    <h1>SIGN UP</h1>
                    <div>
                        <span className="login_icon">&#x1F464;</span><input type="text" placeholder="Username" className="login_text" id="input_username" onChange={this.handleUsernameChange}/>
                    </div>

                    <div>
                        <span className="login_icon" >&#x1F4E7;</span><input type="email" placeholder="Email" className="login_text" id="input_email" onChange={this.handlEmailChange}/>
                    </div>

                    <div>
                        <span className="login_icon" >&#x1F512;</span><input type="password" placeholder="Password" className="login_text" id="input_pwd" onChange={this.handlePwdChange}/>
                    </div>

                    <div>
                        <span className="login_icon" >&#x1F512;</span><input type="password" placeholder="Confirm password" className="login_text" id="input_cpwd"onChange={this.handleCPwdChange}/>
                    </div>


                    <div>
                        <button type="button" className="submit_button" onClick={this.submit}>
                        SIGN UP
                        </button>
                    </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
