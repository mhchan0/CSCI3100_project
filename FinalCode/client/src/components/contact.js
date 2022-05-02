import React, { Component } from 'react';
import Navbar from './navbar';
import Logout from './logout';

class Contact extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>StolkStalker&nbsp;Team</h1>
                    <div>
                        &#x1F4E7;Email:&nbsp;stockstalker0@gmail.com
                    </div>
                </div>
                <Logout />
            </div>
        );
    }
}

export default Contact;