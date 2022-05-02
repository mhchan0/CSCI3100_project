import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

class Navigation extends Component {

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

    initTheme = () => {//initialize theme 
        const { username } = useParams();
        if (username) {
            let theme = -1;//get the theme of user
            axios.get('/users/' + username)
                .then((response) => {
                    const data = response.data[0];
                    theme = data.theme;
                    if (theme === 1) {
                        localStorage.setItem("theme", "night");
                        this.setTheme("night");
                    }
                    else {
                        localStorage.setItem("theme", "day");
                        this.setTheme("day");
                    }
                })
                .catch((err) => {
                    localStorage.setItem("theme", "day");
                    this.setTheme("day");
                    console.log(err);
                });
        }
        else {
            localStorage.setItem("theme", "day");
            this.setTheme("day");
        }
    }
    
    current_user = '';
    user_icon = '/img/guest.jpg';

    componentDidMount = (e) => {//react procedure
        const element = document.getElementById("hide_name");
        if (element) {
            this.current_user = element.innerHTML;
        }
        this.getIcon();
    }

    openLogoutButton = (e) => {//open logout button
        const element = document.getElementById("logout_bar");
        if (element != null) {
            const logout_e = document.getElementById("logout_link");
            if (logout_e != null) {
                logout_e.style.display = "block";
                logout_e.style.marginLeft = "200px";
            }
        }     
    }

    closeLogoutButton = (e) => {//close logout button
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
            logout_e.style.display = "none";
            logout_e.style.marginLeft = "0px";
        }
    }

    getIcon = () => {//get icon
        if (this.current_user !== "") {//get from database
            axios.get('/users/'+this.current_user)
            .then((response) => {
                const recv = response.data[0].photo;
                const photo = document.getElementById("user_icon");
                if (photo) {
                    this.user_icon = "/img/" + recv;
                    photo.src = this.user_icon;
                }
            })
            .catch((err) => {
                this.user_icon = '/img/guest.jpg'
            });
        }
        else {
            this.user_icon = '/img/guest.jpg'
        }
    }

    returnCurrentUser = () => {//get current user
        const { username } = useParams();
        if (username) {
            const hide_name = username;
            return (
                <div id='hide_name'>{hide_name}</div>
            );
        }
        else {
            const hide_name = "";
            return (
                <div id='hide_name'>{hide_name}</div>
            );
        }
    }

   showNavbar = () => {//show the navbar (left)
        const { username } = useParams();

        if (username) {
            this.current_user = username;
            this.getIcon();

            const user_type = localStorage.getItem("type");
            if (user_type === "1") {
                //return html code
                return (
                    <div class="sidebar">
                        <Link to={"/home/"+this.current_user} style={{ textDecoration: 'none' }} className="link" id="home_link">Home</Link>
                        <Link to={"/search_main/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Search</Link>
                        <Link to={"/stocklist/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Stock List</Link>
                        <Link to={"/userlist/"+this.current_user} style={{ textDecoration: 'none' }} className="link">User List</Link>
                        <Link to={"/settings/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Settings</Link>
                        <Link to={"/contact/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Contact Us</Link>
                        <Link to={"/settings/"+this.current_user} style={{ textDecoration: 'none' }}>
                        <div className="user" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton}>
                            <p>
                            <img src={this.user_icon} className="icon" id="user_icon" alt=""/>
                            <span className="username" id="current_username">{this.current_user}</span>
                            </p>
                        </div>
                        </Link>
                    </div>
                );
            }
            else {
                return (
                    <div class="sidebar">
                        <Link to={"/home/"+this.current_user} style={{ textDecoration: 'none' }} className="link" id="home_link">Home</Link>
                        <Link to={"/search_main/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Search</Link>
                        <Link to={"/stocklist/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Stock List</Link>
                        <Link to={"/settings/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Settings</Link>
                        <Link to={"/contact/"+this.current_user} style={{ textDecoration: 'none' }} className="link">Contact Us</Link>
                        <Link to={"/settings/"+this.current_user} style={{ textDecoration: 'none' }}>
                        <div className="user" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton}>
                            <p>
                            <img src={this.user_icon} className="icon" id="user_icon" alt=""/>
                            <span className="username" id="current_username">{this.current_user}</span>
                            </p>
                        </div>
                        </Link>
                    </div>
                );
            }
        }
        else {
            this.current_user = "";
            this.getIcon();

            return (
                <div class="sidebar">
                    <Link to={"/home/popular"} style={{ textDecoration: 'none' }} className="link" id="home_link">Home</Link>
                    <Link to={"/search_main"} style={{ textDecoration: 'none' }} className="link">Search</Link>
                    <Link to={"/stocklist"} style={{ textDecoration: 'none' }} className="link">Stock List</Link>
                    <Link to={"/contact"} style={{ textDecoration: 'none' }} className="link">Contact Us</Link>
                    <div className="user" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton}>
                        
                        <span className="guest_button"  style={{ borderRight: "1px #555 solid" }}>
                        <Link to={"/"} style={{ textDecoration: 'none' }} className="guest_button_link">LOG IN</Link>
                        </span>
                        <span className="guest_button"  style={{ borderLeft: "1px #555 solid" }}>
                        <Link to={"/signup"} style={{ textDecoration: 'none' }} className="guest_button_link">
                            SIGN UP
                        </Link>
                        </span>
                    </div>
                </div>
            );
        }
    }

    checkUser = () => {//check if user has logged in
        const { username } = useParams();
        if (username) {
            if (localStorage.getItem("loggedIn") !== username) {
                window.location.replace("/");
            }
        }
    }


    render() {

        return (
            <div>
            <this.returnCurrentUser />
            <this.showNavbar />
            <this.initTheme />
            <this.checkUser />
            </div>
        );
    }
}

export default Navigation;