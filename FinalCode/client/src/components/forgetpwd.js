import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import{ init, send} from '@emailjs/browser';

init("PXwTcr4WhSncAgm90");

class ForgetPwd extends Component {

    state = {
        email: "",
    }

    handlEmailChange = (e) => {//handle email bar change
        this.setState({
            email: e.target.value
        });
    }

    clearText = () => {//clear text 

        this.setState({
            email: ""
        });

        const input_email = document.getElementById("input_email");
        if (input_email) {
            input_email.value = "";
        }
    }

    submit = () => {//on submit
        if (this.state.email === "") {
            alert("Please input your email.");
            this.clearText();
            return;
        }
        //search for email
        axios.get('/users/findemail/' + this.state.email)
        .then((res) => {
            const data = res.data;
            if (data.length > 0) {

                const username = data[0].username;
                const id = data[0]._id;

                const sendData = {
                    username: username,
                    usertype: -2
                }

                const emailData = {
                    username: username,
                    email: this.state.email,
                    link: "http://localhost:3000/resetpwd/" + username + "/" + id
                }

                axios({//email exist, then change password
                    url: '/users/changeusertype',
                    method: 'PUT',
                    data: sendData
                    })
                    .then(() => {
                        send("stockstalker", "template_luu1rke", emailData)
                        .then(() => {
                            alert("A email has been sent to you for reset password.");
                            this.clearText();
                            return;
                        })
                        .catch(() => {
                            alert("Fail to send email! Pleace try again");
                            this.clearText();
                            return;
                        });
                    })
                    .catch(() => {
                        alert("Fail to find email! Please try again");
                        this.clearText();
                        return;
                    });

            }
            else {
                alert("User email is not found!");
                this.clearText();
                return;
            }
        }).catch(() => {
            alert("Fail to find email! Please try again");
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
                        <span className="login_switcher"></span>
                        <span className="login_switcher"></span>
                    </div>

                    <h1>FIND ACCOUNT</h1>

                    <div>
                    <p id="ask_email">Please enter your email address to search for your account.</p>
                    </div>
                    
                    <div>
                        <span className="login_icon" >&#x1F4E7;</span><input type="email" placeholder="Email" className="login_text" id="input_email" onChange={this.handlEmailChange}/>
                    </div>
                    <div className="login_switch">
                        <span>
                        <Link to={"/"} >
                        <button type="button" className="submit_button" id="login_button">
                        CANCEL
                        </button>
                        </Link>
                        </span>
                        
                        <span>
                        <button type="button" className="submit_button" id="login_button" onClick={this.submit}>
                        ENTER
                        </button>
                        </span>
                    </div>
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgetPwd;