import React, { Component } from 'react';

import Navbar from './navbar';
import Logout from './logout';

class Stocklist extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Stocklist</h1>
                </div>
                <Logout />
            </div>
        );
    }
}

export default Stocklist;