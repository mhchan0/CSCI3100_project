import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {

    render() {
        return (
            <div>
                <h1>login</h1>
                <Link to="/home">login</Link>
            </div>
        );
    }
}

export default Login;