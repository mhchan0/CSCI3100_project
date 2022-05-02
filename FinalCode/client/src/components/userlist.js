import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Logout from './logout';

class Userlist extends Component {

    state = {
        list: [],
        old_password: '',
        new_password: '',
    };

    user = '';
    user_click = '';

    componentDidMount = () => {
        this.getUser();
    }

    handleSearchChange = (e) => {//handle search bar change

        this.user = e.target.value;
        const bar = document.getElementsByClassName("list__display");

        for (const element of bar) {
            const username = element.id;
            const find = new RegExp("^" + this.user);
            const found = username.match(find);

            if (found !== null) {
                document.getElementById(element.id).style.height = "50px";
                document.getElementById(element.id).style.paddingBottom = "10px";
                document.getElementById(element.id).style.border = "1px solid lightgrey";
                document.getElementById(element.id).style.marginTop = "5px";
            }
            else {
                document.getElementById(element.id).style.height = "0px";
                document.getElementById(element.id).style.paddingBottom = "0px";
                document.getElementById(element.id).style.marginTop = "0px";
                document.getElementById(element.id).style.border = "none";
            }         
        }
    };

    getUser = () => {//get users
        axios.get("/users")
        .then((res) => {
            const data = res.data;
            this.setState({
                list: data
            });
        })
        .catch((err) => {
            console.log("Fail to extract data");
        });
    }
    
    displayUser = (list) => {//display list of users

        if (!list.length) return null;
    
        return list.map((list, index) => (
          <div key={index} id={list.username} className="list__display">
            <h3>
                <img src={"/img/" + list.photo} className="list_icon" alt=""/>
                <span className="list_name">{list.username}</span>  
            </h3>
            <div>
                <p>Email: {list.email}</p>
                <p>Password: {list.password} 
                <span className="list_pwd" id={list.username} onClick={this.showPasswordPage}>
                &#x1F512;
                </span>
                </p>
            </div>
          </div>
        ));
    }

    showPasswordPage = (e) => {//show password page
        if (e.target.id) {
            const element = document.getElementById("password_page");
            if (element) {
                if (element.className === "list_password_page") {
                    const element2 = document.getElementById("pwd_legend");
                    if (element2) {
                        if (element2.className === "list_pwd_legend") {
                            this.user_click = e.target.id;
                            element.style.display = "block";
                            element2.innerHTML = "Change Password for " + e.target.id;
                        }
                    }
                }
            }
        }
    }

    clearText = () => {//clear text of old and new password bar
        const opwd = document.getElementById("old_pwd");
        if (opwd) {
            if (opwd.className === "list_old_pwd") {
                opwd.value = "";
            }
        }

        const npwd = document.getElementById("new_pwd");
        if (npwd) {
            if (npwd.className === "list_new_pwd") {
                npwd.value = "";
            }
        }

        this.setState({
            old_password: '',
            new_password: '',
        });
    }

    closePasswordPage = () => {//close password page

        this.clearText();

        const element = document.getElementById("password_page");
        if (element) {
            if (element.className === "list_password_page") {
                element.style.display = "none";
            }
        }

        this.user_click = '';
    }

    handleOpwdChange = (e) => {//handle old password bar
        this.setState({
            old_password: e.target.value
        });

    }

    handleNpwdChange = (e) => {//handle new password bar
        this.setState({
            new_password: e.target.value
        });

    }
    
    leavepwd = () => {//leave password page
        const t = this;
        window.onclick = function(event) {
            if (event.target === document.getElementById("password_page")) {
                t.closePasswordPage();
            }
        }
    }

    submitpwd = () => {//submit new password

        if (this.state.old_password === '') {
            alert("Password can not be empty!");
            this.clearText();
            return;
        }

        if (this.state.new_password !== this.state.old_password) {
            alert("Passwords do not match!");
            this.clearText();
            return;
        }

        const sendData = {
            username: this.user_click,
            password: this.state.new_password
        }

        axios({
            url: '/users/updatepwd',
            method: 'PUT',
            data: sendData
        })
        .then(() => {
            alert("Password is updated.");
            this.closePasswordPage();
            window.location.reload();
        })
        .catch(() => {
            alert("Fail to update password. Pleace try again.");
            this.clearText();
        });

    }

    render() {

        return (
            <div>
                <Navbar />
                <this.leavepwd/>
                <div className="main">
                    <div>
                        <h1>User list</h1>
                    </div>
                    <div className="user_search_bar">
                        <input type="search" 
                        className="input_search" 
                        placeholder="Search User..." 
                        onChange={this.handleSearchChange}/>
                    </div>
                    <div>
                        {this.displayUser(this.state.list)}
                    </div>

                    <div className="list_password_page" id="password_page">
                        <div id="password_menu">
                            <div id="password_field">
                                <fieldset>
                                <legend><h2 className="list_pwd_legend" id="pwd_legend"></h2></legend>
                                <div>
                                    <input type="password" className="list_old_pwd" id="old_pwd" placeholder="Password" onChange={this.handleOpwdChange} />
                                </div>
                                <h1></h1>
                                <div>
                                    <input type="password"  className="list_new_pwd" id="new_pwd" placeholder="Confirm Password" onChange={this.handleNpwdChange} />
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
            </div>
        );
    }
}

export default Userlist;