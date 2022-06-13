/**
 * PROGRAM stockinfo.js - Program for displaying stock information
 * PROGRAMMER: CHAN, Man Ho
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To get stock information and display stock information
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import axios from 'axios';

class StockInfo extends Component {

    state = {
        date: '',
        open: '',
        high: '',
        low: '',
        close: '',
        adj_close: '',
        volume: '',
    }

    previous = -1;

    componentDidMount = () => {
        this.getData();
        
    }

    getData = () => {//get stock data 
        const element = document.getElementById("hide_stock");
        if (element) {

            const sendData = {
                stock: element.innerHTML,
                previous: this.previous
            };
            axios.post("http://localhost:8080/stockdata", sendData, {})
            .then(res => {
                let data = res.data[0].split(' ');
                this.setState({
                    date: data[0],
                    open: parseFloat(data[1]).toFixed(2),
                    high: parseFloat(data[2]).toFixed(2),
                    low: parseFloat(data[3]).toFixed(2),
                    close: parseFloat(data[4]).toFixed(2),
                    adj_close: parseFloat(data[5]).toFixed(2),
                    volume: parseFloat(data[6]).toFixed(2),
                });
            })
            .catch(()=>{
                return;
            });

        }
    }

    onClickLeft = () => {//click to see data of previous day
        this.previous--;
        this.getData();
    }

    onClickRight = () => {//click to see data of next day
        this.previous++;
        if (this.previous >= 0) {
            this.previous = -1;
        }
        this.getData();
    } 

    returnData = () => {
        return (
            <div>
                <table>
                    <tr><td>Date:</td><td>{this.state.date}</td></tr>
                    <tr><td>Open:</td><td>{this.state.open}</td></tr>
                    <tr><td>High:</td><td>{this.state.high}</td></tr>
                    <tr><td>Low:</td><td>{this.state.low}</td></tr>
                    <tr><td>Close:</td><td>{this.state.close}</td></tr>
                    <tr><td>Adj Close:</td><td>{this.state.adj_close}</td></tr>
                    <tr><td>Volume:</td><td>{this.state.volume}</td></tr>
                </table>
                <span className='arrow_data' id="left_arrow" onClick={this.onClickLeft}>&#8678;</span>
                <span className='arrow_data' id="right_arrow" onClick={this.onClickRight}>&#8680;</span>
            </div>
        );
    }

    render() {
        return (
            <div className='data_field'>
                <this.returnData />
            </div>
        );
    }
}
export default StockInfo;