/**
 * PROGRAM verify.js - Program for verifying user
 * PROGRAMMER: CHAN, Man Ho
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: After users clicked the verification link of email, users will become verified users
 *          and will be allowed to login. This program is to verify users and update the status of users
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


class Verify extends Component {


    click = () => {
        window.location.replace("/");
    }

    verifyUser = () => {//verify user
        const { username, id} = useParams();

        const sendData = {
            username: username,
            usertype: 0
        }

        axios.get('/users/' + username)
        .then((res) => {
            const data = res.data;
            if (data.length > 0) {
                if (data[0]._id !== id) {
                    this.click();
                    return;
                }
                if (data[0].usertype === -1) {//change user type(update status of user)
                    axios({
                        url: '/users/changeusertype',
                        method: 'PUT',
                        data: sendData
                        })
                        .then(() => {
                            return;
                        })
                        .catch(() => {
                            this.click();
                            return;
                        });
                }
                else {
                    this.click();
                    return;
                }
            }
            else {
                this.click();
                return;
            }
        })
        .catch(() => {
            this.click();
            return;
        })
    }


    render() {
        return (
            <div class="login_page">
                <this.verifyUser/>
                <div class="login_field">
                    <div className="login_content">
                    <div className="login_switch">
                        <span className="login_switcher"></span>
                        <span className="login_switcher"></span>
                    </div>

                    <h1>VERIFIED ✔</h1>

                    <div>
                        Your email has been verified!
                    </div>

                    <div>
                        <button type="button" className="submit_button" onClick={this.click}>
                        LOG IN
                        </button>
                    </div>
                    
                
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Verify;