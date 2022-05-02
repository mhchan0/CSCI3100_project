import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    clearText = () => {//clear login bar text
        this.setState({
            username: "",
            password: ""
        });

        const input_username = document.getElementById("login_username");
        if (input_username) {
            input_username.value = "";
        }

        const input_pwd = document.getElementById("login_pwd");
        if (input_pwd) {
            input_pwd.value = "";
        }
    }

    handleUsernameChange = (e) => {//change username bar
        this.setState({
            username: e.target.value
        });
    }

    handlePwdChange = (e) => {//change password bar
        this.setState({
            password: e.target.value
        });
    }

    submit = (e) => {//on submit
       if (this.state.username === "") {
           alert("Username is empty!");
           this.clearText();
           return;
       }

       if (this.state.password === "") {
           alert("Password is empty!");
           this.clearText();
           return;
       }

       axios.get('/users/' + this.state.username)//update to server
       .then((res) => {
           const data = res.data;
           if (data.length > 0) {
               if (this.state.password === data[0].password) {
                   if (data[0].usertype < 0) {
                       if (data[0].usertype === -1) {
                        alert("Please check the verification email!");
                        this.clearText();
                        return;
                       }
                       else if(data[0].usertype === -2) {

                        const sendData = {
                            username: this.state.username,
                            usertype: 0
                        }
                        
                        axios({
                            url: '/users/changeusertype',
                            method: 'PUT',
                            data: sendData
                            })
                            .then(() => {
                                localStorage.setItem("type", 0);
                                localStorage.setItem("loggedIn", this.state.username);
                                window.location.replace("/home/"+this.state.username);
                                return;
                            })
                            .catch(() => {
                                alert("Fail to log in. Please try again.");
                                this.clearText();
                                return;
                            });

                       }

                   }
                   else {
                        localStorage.setItem("type", data[0].usertype);
                        localStorage.setItem("loggedIn", this.state.username);
                        window.location.replace("/home/"+this.state.username);
                        return;
                   }
               }
               else {
                   alert("Passwords do not match!");
                   this.clearText();
                   return;
               }
           }
           else {
               alert("Username is not found!");
               this.clearText();
               return;
           }
       })
       .catch(() => {
           alert("Fail to log in. Please try again.");
           this.clearText();
           return;
       });


    }

    render() {

        const using_user = localStorage.getItem("loggedIn");
        if (using_user !== null) {
            window.location.replace("/home/" + using_user);
        }

        
        return (
            <div class="login_page">
                <div class="login_field">
                    <div class="login_content">
                    <div className="login_switch">
                        <span className="login_switcher">LOG IN</span>
                        <Link to={"/signup"} style={{ textDecoration: 'none' }}>
                        <span className="login_switcher">SIGN UP</span>
                        </Link>

                    </div>
                    <h1>LOG IN</h1>
                    <div>
                        <span className="login_icon">&#x1F464;</span><input type="text" placeholder="Username" className="login_text" id="login_username" onChange={this.handleUsernameChange}/>
                    </div>

                    <div>
                        <span className="login_icon" >&#x1F512;</span><input type="password" placeholder="Password" className="login_text" id="login_pwd" onChange={this.handlePwdChange}/>
                        <br/>
                        <Link to={"/findaccount"} style={{ textDecoration: 'none' }}>
                        <p id="forgot_pwd">Forgot password?</p>
                        </Link>
                    </div>
                    <div>
                        <button type="button" className="submit_button" onClick={this.submit}>
                        LOG IN
                        </button>
                    </div>
                    <div style={{ position: 'absolute', bottom: "0%", right: "0%"}}>
                        <Link to={"/home/popular"} style={{ textDecoration: 'none' }} className="login_switcher">
                        Log in as guest
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;