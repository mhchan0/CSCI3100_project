import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


class Verify extends Component {


    click = () => {
        window.location.replace("/");
    }

    verifyUser = () => {
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
                if (data[0].usertype === -1) {
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