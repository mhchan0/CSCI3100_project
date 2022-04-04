import React, { Component } from 'react';

import Navbar from './navbar';
import Logout from './logout';
import Comment from './comment';

class Search extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Search</h1>
                </div>
                <Comment />
                <Logout />
            </div>
        );
    }
}

export default Search;