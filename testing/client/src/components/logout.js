import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Logout extends Component {

    openLogoutButton = (e) => {
        const logout_e = document.getElementById("logout_link");
        if (logout_e != null) {
                logout_e.style.display = "block";
                logout_e.style.marginLeft = "200px";
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
            <div id="logout_bar">
                    <Link to="/" style={{ textDecoration: 'none' }} id="logout_link" className="link" onMouseOver={this.openLogoutButton} onMouseOut={this.closeLogoutButton}>Logout</Link>
            </div>
        );
    }
}

export default Logout;