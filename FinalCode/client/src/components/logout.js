/**
 * PROGRAM logout.js - Program for users to log out
 * PROGRAMMER: CHAN, Man Ho
 * VERSION 1.0.0: written Apr 3, 2022
 * PURPOSE: To display log out button for login users to log out
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";

class Logout extends Component {

    openLogoutButton = (e) => {//open logout button
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
                logout_e.style.display = "block";
                logout_e.style.marginLeft = "200px";
        }     
    }

    closeLogoutButton = (e) => {//close logout button
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
            logout_e.style.display = "none";
            logout_e.style.marginLeft = "0px";
        }
    }

    click_logout = () => {//click logout, clear localstorage(username record)
        localStorage.clear();
    }

    leaveButton = () => {//logout button
        const { username } = useParams();
        if (username) {
            return (
                <Link to="/" style={{ textDecoration: 'none' }} id="logout_link" className="link" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton} onClick={this.click_logout}>
                    Logout
                </Link>
            );
        }

    }

    render() {
        return (
            <div id="logout_bar">
                <this.leaveButton />
            </div>
        );
    }
}

export default Logout;
