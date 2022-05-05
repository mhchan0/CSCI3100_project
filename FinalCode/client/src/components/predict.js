/**
 * PROGRAM prediction.js - Program for computing and displaying risk and return
 * PROGRAMMER: LEE, Yan Hin
 * VERSION 1.0.0: written Apr 6, 2022
 * PURPOSE: To compute risk and return and display the prediction graph according to user's inputs
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';



class Predict extends Component {
    constructor() {
        super();
        this.state  = {
            stock: '',
            CI: JSON.parse(window.localStorage.getItem('CI')) || 95,
            params: JSON.parse(localStorage.getItem('params')) || 95,
            m: JSON.parse(localStorage.getItem('m')) ||7,
            use_period: JSON.parse(localStorage.getItem('use_period')) ||125,
            dataget: JSON.parse(localStorage.getItem('dataget'))|| 1,
            stockname: JSON.parse(localStorage.getItem('stockname'))||''
        }

    }
    
    stock_url = '';
    img_url = '';
    returnCurrentStock = () => {//return current stock
        const { stock } = useParams();
        const hide_stock = stock;
        this.stock_url = hide_stock;
        this.state.stock = this.stock_url;
        this.img_url = '/stock_graph/'+ this.stock_url + '.jpg';
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state));
        super.setState(state);
    }

    componentDidMount () {
        const persistState = localStorage.getItem('state');
        
        if (persistState) {
          try {
            this.setState(JSON.parse(persistState));
          } catch (e) {
            // is not json
          }
        }
      }

    handleCIChange = (e) => {//onchange, confidence interval
        super.setState({
          CI: e.target.value
        });
      };

    handleParamsChange = (e) => {//onchange, params
        super.setState({
        params: e.target.value
    });
    };

    handleMChange = (e) => {//onchange, M
        super.setState({
          m: e.target.value
        });
      };

    handleUsePeriodChange = (e) => {//onchange, period
        super.setState({
        use_period: e.target.value
    });
    };


    submit = () => {// on submit
        if ((this.state.CI <= 0) || (this.state.CI >= 100)) {
            alert("CI must be >0 and <100!");
            return;
        }
        if ((this.state.params <= 0) || (this.state.params >= 100)){
            alert("params must be >0 and <100!");
            return;
        }
        if ((this.state.use_period < 100) || (this.state.use_period > 750)) {
            alert("use_period must be >=100 and <=750!");
            return;
        }
        if ((this.state.m < 1) || (this.state.m > 20)) {
            alert("perdict_period must be >=1 and <=20!");
            return
        }
        const payload = {
            stock: this.stock_url,
            CI: this.state.CI,
            params: this.state.params,
            m: this.state.m,
            use_period: this.state.use_period
        };
        
        axios.post("http://localhost:8080/prediction/test", payload, {})//send to server to get prediction
        .then(res => {
            this.setState({...this.state, dataget: res.data});
            this.setState({...this.state, dataget: res.data});
            this.setState({...this.state, dataget: res.data});
            this.setState({...this.state, stockname: this.stock_url});
            window.location.reload();
        });
    }

    displaydata = () =>{// to display predictions
        if (this.state.dataget === 1){
            return;
        }
        if (this.state.stockname !== this.state.stock) {
            return;
        }
        return <div className='predict_num'>
            <h4 className='testing1'> {this.state.dataget[0]}</h4>
            <h4 className='testing1'> {this.state.dataget[1]}</h4>
            <h4 className='testing1'> {this.state.dataget[2]}</h4>
            <h4 className='testing1'> {this.state.dataget[3]}</h4>
            <h4 className='testing1'> {this.state.dataget[4]}</h4>
            <h4 className='testing1'> {this.state.dataget[5]}</h4>
            <h4 className='testing1'> {this.state.dataget[6]}</h4>
            <h4 className='testing1'> {this.state.dataget[7]}</h4>
        </div>;

    }

    render() {
        return (
            <div>
                
            <div className='predict_whole'>
                <this.returnCurrentStock/>
                <p className = 'predict_input'>Input for prediction:</p>
                <label className='predict_input'>CI (%):</label>
                <br/>
                <input type="text" id="ci" name="ci" className='predict_input' placeholder='95' onChange={this.handleCIChange}/>
                <br/>
                <label className='predict_input'>params (%):</label>
                <br/>
                <input className='predict_input' type="text" id="params" name="params" placeholder='95' onChange={this.handleParamsChange}/>
                <br/>
                <label className='predict_input'>predict_period:</label>
                <br/>
                <input className='predict_input' type="text" id="u" name="u" placeholder='7' onChange={this.handleMChange}/>
                <br/>
                <label className='predict_input'>use_period:</label>
                <br/>
                <input className='predict_input' type="text" id="use_period" name="use_period" placeholder='125' onChange={this.handleUsePeriodChange}/>
                <br/>
                <div className='predict_input'>
                    <button className='submit_button' type="submit" onClick={this.submit}>submit</button>
                </div>

            </div>
                <div><this.displaydata/></div>
                <div className='image_pre'>
                <img src={this.img_url} id="predict_img" width="431" height="350" alt="Please click submit to generate prediction graph."/>
                </div>
            </div>
        );
    }
}
export default Predict;
