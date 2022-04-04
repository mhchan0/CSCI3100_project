import React, { Component } from 'react';

import Navbar from './navbar';
import Logout from './logout';

class Home extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Home</h1>
                </div>
                <Logout />
            </div>
        );
    }
}

export default Home;