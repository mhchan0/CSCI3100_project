/**
 * PROGRAM stocklist.js - Program for finding and displaying stock list
 * PROGRAMMER: CHAN, Man Ho
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To find a list of all stocks and displaying stock list, also include 
 *          the function to sort in ascending or descending order with stock name or stock symbol
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import Navbar from './navbar';
import Logout from './logout';
import axios from 'axios';
class Stocklist extends Component {
    state = {
        marks:[],
        names:[],
      };
    marks = [];
    username_url = '';
    stock_asce = 1;
    Arrr = [];
    sort_wt = 1;

    constructor(props) {
        super(props);
        this.getMarks();
    }

    componentDidMount = () => {//react procedure
        this.getMarks();

    };


    getMarks = () => {//get all stocks symbols
        if (this.username_url !== ''){

            axios.get('/stocks')
            .then((response) => {
                const data = response.data;
                if (this.stock_asce === -1){
                    data.reverse();

                    this.setState({marks: data});

                    this.findStockName();//find stock names by stock symbol
                }else{
                    this.setState({marks: data});

                    this.findStockName();
                }
                

            })
            .catch(() => {
                alert('No such data.');
            });

        }
      }


    displayMarks = (marks) => {//display the stocks

        if (!marks.length) return null;
        
        var show = marks.map((mark, indexs) =>(
          <div key={indexs} className="mark__display" onClick={()=>this.handleClick(this.username_url, mark.Symbol)}>
            <div>{this.state.names[indexs]}</div>
            <p>{mark.Symbol}</p>
          </div>
        ));

        return show;
    }
    

    findStockName =() => {//find stock name by stock symbol
        axios.get('/stocks')
        .then((response) => {
            const data = response.data;
            if (this.stock_asce === -1){
                data.reverse();
            }
            var newArr = [];
            if (data !== 0){
                for (let i = 0;i<data.length;i++){
                    newArr.push(data[i].Name);
                }
                
                
                this.setState({names: newArr})
            }
            
        })
        .catch(() => {
            console.log("error",this.stockname);

        });
    }


    handleClick = (username, stock) => {//onclick, direct to stock page
        if (username !== null) {
            window.location.replace("/search/"+username+"/"+stock);
        }
        else {
            window.location.replace("/search/"+stock);
        }
    }


    change_asc = (e) => {//ascending order or desc(symbol)
        this.setState({names: []});
        this.stock_asce = this.stock_asce * -1;
        if (this.sort_wt === 1){

            this.getMarks();
            this.findStockName();
            
        }else{

            this.Arrr = [];

            //make a list , have Symbol and Name
            for (let i=0;i<this.state.marks.length;i++){
                this.Arrr.push({Symbol: this.state.marks[i].Symbol, Name: this.state.names[i]});
            }
            if (this.stock_asce === 1){//ascending
                this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name));

            }
            if (this.stock_asce === -1){//reverse if descending
                this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name)).reverse();

            }
            
            this.setState({marks: []});
            this.setState({names: []});
            var marksArr = [];
            var namesArr = [];
            for (let i=0;i<this.Arrr.length; i++){
                marksArr.push({Symbol: this.Arrr[i].Symbol});
                namesArr.push(this.Arrr[i].Name);
            }

            this.setState({marks: marksArr});
            this.setState({names: namesArr});
        }

    }


    change_name = (e) => {//asce or desc order(name)
        if (this.sort_wt === -1){
            this.sort_wt = this.sort_wt * -1;

            this.getMarks();
            this.findStockName();
            return;
        }
        this.sort_wt = this.sort_wt * -1;

        this.Arrr = [];

        //make a list , have Symbol and Name
        for (let i=0;i<this.state.marks.length;i++){
            this.Arrr.push({Symbol: this.state.marks[i].Symbol, Name: this.state.names[i]});
        }
        if (this.stock_asce === 1){//if ascending
            this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name));

        }
        if (this.stock_asce === -1){//reverse if descending
            this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name)).reverse();

        }

        this.setState({marks: []});
        this.setState({names: []});
        var marksArr = [];
        var namesArr = [];
        for (let i=0;i<this.Arrr.length; i++){
            marksArr.push({Symbol: this.Arrr[i].Symbol});
            namesArr.push(this.Arrr[i].Name);
        }

        this.setState({marks: marksArr});
        this.setState({names: namesArr});

    }


    returnCurrentUser = () => {//return current user
        this.username_url = localStorage.getItem("loggedIn");
        return;
    }


    render() {
        this.returnCurrentUser();
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1> Stocklist</h1>
                </div>

                <div className='select'>
                <select name="choice" id="choice" onChange={this.change_name}>
                    <option value="1">Symbol</option>
                    <option value="-1">Name</option>
                </select>
                <select name="choice" id="choice" onChange={this.change_asc}>
                    <option value="1">Ascending</option>
                    <option value="-1">Descending</option>
                </select>
                </div>

                <this.returnCurrentUser/>
                <div>
                    {this.displayMarks(this.state.marks)}
                </div>
                <Logout />
            </div>
        );
    }
}

export default Stocklist;