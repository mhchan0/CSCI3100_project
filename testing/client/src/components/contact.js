import React, { Component } from 'react';

import Navbar from './navbar';
import Logout from './logout';

class Contact extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Contact</h1>
                </div>
                <Logout />
            </div>
        );
    }
}

export default Contact;