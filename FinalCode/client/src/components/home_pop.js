/**
 * PROGRAM home_pop.js - Program for displaying popular stocks in homepage
 * PROGRAMMER: LEE, Yan Hin
 * VERSION 1.0.0: written Apr 7, 2022
 * PURPOSE: To get stocks records from database and list the popular stocks to users
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import Navbar from './navbar';
import Logout from './logout';
import axios from 'axios';

class Home extends Component {

    state = {
        marks:[],
        names:[],
        counts:[]
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


    getMarks = () => {//to get highest comments stock
        if (this.username_url !== ''){

            axios.get('/comments/highest/comment')
            .then((response) => {
                const data = response.data;
                
                var arr = [];
                var countarr = [];
                for (let i=0; i<data.length; i++){
                    arr.push(data[i]._id.stock);
                    countarr.push(data[i].count);
                }
                
                this.setState({marks: arr});
                this.setState({counts: countarr});
                for (let i=0; i<this.state.marks.length; i++){
                    this.findStockName(this.state.marks[i]);
                }

            })
            .catch(() => {
                alert('No such data.');
            });

        }
      }


    displayMarks = (marks) => {//display stocks(highest comments)

        if (!marks.length) return null;
        
        var show = marks.map((mark, indexs) =>(
          <div key={indexs} className="pop__display" onClick={()=>this.handleClick(this.username_url, this.state.marks[indexs])}>
            <div>{this.state.marks[indexs]}</div>
            <p>{this.state.names[indexs]}</p><p>Number of comments: {this.state.counts[indexs]}</p>
          </div>
        ));

        return show;
    }
    

    findStockName =(stockname_url) => {//find stock name with stock symbol
        axios.get('/stocks/find/'+stockname_url)
        .then((response) => {
            const data = response.data;

            var newArr = this.state.names;
            if (data !== 0)
            newArr.push(data);

            this.setState({names: newArr})
        })
        .catch(() => {
            console.log("error",this.stockname);

        });
    }


    handleClick = (username, stock) => {//onclick, redirect
        if (username !== null) {
            window.location.replace("/search/"+username+"/"+stock);
        }
        else {
            window.location.replace("/search/"+stock);
        }
    }




    returnCurrentUser = () => {// to get current user
        this.username_url = localStorage.getItem("loggedIn");
        return;
    }


    gopop = () =>{//redirect to popular stock page
        if (this.username_url !== null) {
            window.location.replace("/home/"+this.username_url+"/popular");
        }
        else {
            window.location.replace("/home/popular");
        }
    }

    gomark = () =>{//redirect to marked stock page (home page)
        if (this.username_url !== null) {
            window.location.replace("/home/"+this.username_url);
        }
        else {
            alert("Please log in to use the mark function!");
        }
    }

    render() {
        this.returnCurrentUser();
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Home</h1>
                </div>
                <div className="popp">
                <div className="pop" id="pop_left" onClick={this.gopop} style={{ borderRight: 'none'}}>Popular Stock</div>
                <div className="pop" id="pop_right" onClick={this.gomark}>Marked Stock</div>
                </div>
                <div><h4>Popular stock:</h4></div>
                
                

                <this.returnCurrentUser/>
                <div>
                    {this.displayMarks(this.state.marks)}
                </div>
                <Logout />
            </div>
        );
    }
}

export default Home;
