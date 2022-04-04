import React, { Component } from 'react';
import { Link } from "react-router-dom";

import icon from "../img/guest.jpg";

class Navigation extends Component {

    openLogoutButton = (e) => {
        const element = document.getElementById("logout_bar");
        if (element != null) {
            const logout_e = document.getElementById("logout_link");
            if (logout_e != null) {
                logout_e.style.display = "block";
                logout_e.style.marginLeft = "200px";
            }
        }     
    }

    closeLogoutButton = (e) => {
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
            logout_e.style.display = "none";
            logout_e.style.marginLeft = "0px";
        }
    }

    render() {
        return (
            <div class="sidebar">
                <Link to="/home" style={{ textDecoration: 'none' }} className="link" id="home_link">Home</Link>
                <Link to="/search" style={{ textDecoration: 'none' }} className="link">Search</Link>
                <Link to="/stocklist" style={{ textDecoration: 'none' }} className="link">Stock List</Link>
                <Link to="/settings" style={{ textDecoration: 'none' }} className="link">Settings</Link>
                <Link to="/contact" style={{ textDecoration: 'none' }} className="link">Contact Us</Link>
                <Link to="/settings" style={{ textDecoration: 'none' }}>
                <div className="user" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton}>
                    <p>
                    <img src={icon} className="icon"/>
                    <span className="username">username</span>
                    </p>
                </div>
                </Link>
            </div>
        );
    }
}

export default Navigation;