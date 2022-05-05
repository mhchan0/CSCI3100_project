/**
 * PROGRAM restpwd.js - Program for users to reset passwords
 * PROGRAMMER: LUI, Him
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To get users records from database and reset passwords of the current user
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


class Resetpwd extends Component {

    state = {
        password: "",
        confirm_pwd: ""
    }

    handlePwdChange = (e) => {//handle password change
        this.setState({
            password: e.target.value
        });
    }

    handleCPwdChange = (e) => {//handle confirm password change
        this.setState({
            confirm_pwd: e.target.value
        });
    }

    clearText = () => {//clear text in password and confirm pw bar
        this.setState({
            username: "",
            email: "",
            password: "",
            confirm_pwd: ""
        });

        const input_pwd = document.getElementById("input_pwd");
        if (input_pwd) {
            input_pwd.value = "";
        }

        const input_cpwd = document.getElementById("input_cpwd");
        if (input_cpwd) {
            input_cpwd.value = "";
        }
    }

    submit = () => {//on submit

        const element = document.getElementById("hide_name");

        if (element) {

            const username = element.innerHTML;

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

            const sendData = {
                username: username,
                password: this.state.password
            }

            axios({//update password to server
                url: '/users/updatepwd',
                method: 'PUT',
                data: sendData
            })
            .then(() => {
                
                const typeData = {
                    username: username,
                    usertype: 0
                }

                axios({
                    url: '/users/changeusertype',
                    method: 'PUT',
                    data: typeData
                })
                .then(() => {
                    alert("Reset password successfully!");
                    this.clearText();
                    window.location.replace("/");
                    return;
                })
                .catch(() => {
                    alert("Fail to reset password! Please try again");
                    this.clearText();
                    return;
                });
                
            })
            .catch(() => {
                alert("Fail to reset password! Please try again");
                this.clearText();
                return;
            });



        }

        else {
            alert("Fail to reset password! Please try again.");
            this.clearText();
            return;
        }


    }


    check = () => {//check user
        const { username, id} = useParams();

        axios.get('/users/' + username)
        .then((res) => {
            const data = res.data;
            if (data.length > 0) {
                if (data[0]._id !== id) {
                    window.location.replace("/");
                    return;
                }
                if (data[0].usertype !== -2) {
                    window.location.replace("/");
                    return;
                }
            }
            else {
                window.location.replace("/");
                return;
            }
        })
        .catch(() => {
            window.location.replace("/");
            return;
        })
    }

    returnCurrentUser = () => {//return current username
        const { username} = useParams();
        const hide_name = username;
        return (
            <div id='hide_name'>{hide_name}</div>
        );
    }


    render() {
        return (
            <div class="login_page">
                <this.check/>
                <this.returnCurrentUser />
                <div class="login_field">
                    <div className="login_content">
                    <div className="login_switch">
                        <span className="login_switcher"></span>
                        <span className="login_switcher"></span>
                    </div>

                    <h1>RESET PASSWORD</h1>

                    <div>
                        <span className="login_icon" >&#x1F512;</span><input type="password" placeholder="New password" className="login_text" id="input_pwd" onChange={this.handlePwdChange}/>
                    </div>

                    <div>
                        <span className="login_icon" >&#x1F512;</span><input type="password" placeholder="Confirm password" className="login_text" id="input_cpwd"onChange={this.handleCPwdChange}/>
                    </div>


                    <div>
                        <button type="button" className="submit_button" onClick={this.submit}>
                        ENTER
                        </button>
                    </div>
                    
                
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Resetpwd;
