/**
 * PROGRAM search_main.js - Program for listing stocks for users to search
 * PROGRAMMER: LEE, Yan Hin
 * VERSION 1.0.0: written Apr 7, 2022
 * PURPOSE: To get stocks records from database and display a list of stocks for users to search
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import Navbar from './navbar';
import Logout from './logout';
import axios from 'axios';
class Home extends Component {
    state ={
        stock: '',
        marks: '',
        names: ''
    }
    stock_url = "";
    current_user = "test_user";
    string = "";
    new1 = [];
    new2 = [];
    componentDidMount = () =>{
      this.getStock();
    }
    resetUserInputs = () => {
        this.setState({
          stock: ''
        });
      };

    handleSearchChange = (e) => {//handle search bar change
        this.setState({
          stock: e.target.value
        });
        this.string = e.target.value;
        
        const bar = document.getElementsByClassName("search_list");

        for (const element of bar) {
            const find_match = this.string.toUpperCase();
            const stock = element.id;
            const find = new RegExp(find_match);
            const found = stock.match(find);

            if (found !== null) {
                document.getElementById(element.id).style.height = "45px";
                document.getElementById(element.id).style.border = "3px solid rgb(116, 136, 101)";
                document.getElementById(element.id).style.paddingTop = "5px";
                document.getElementById(element.id).style.marginBottom = "-2px";
            }
            else {
                document.getElementById(element.id).style.height = "0px";
                document.getElementById(element.id).style.paddingTop = "0px";
                document.getElementById(element.id).style.border = "none";
                document.getElementById(element.id).style.marginBottom = "0px";
            }         
        } 
      };

    getStock = () => {//search for related stocks
      axios.get('/stocks')
            .then((response) => {
                const data = response.data;
                var marksArr = [];
                var namesArr = [];
                for (let i=0;i<data.length;i++){
                  marksArr.push(data[i].Symbol);
                  namesArr.push(data[i].Name);
                }
                
                this.setState({marks: marksArr});
                this.setState({names: namesArr});
            })
            .catch(() => {
                console.log("error",this.stockname);

            });
    }

    init = () =>{//initialize the stock list
      axios.get('/stocks')
            .then((response) => {
                const data = response.data;
                var marksArr = [];
                var namesArr = [];
                for (let i=0;i<data.length;i++){
                  marksArr.push(data[i].Symbol);
                  namesArr.push(data[i].Name);
                }
                
                this.new1 = marksArr;
                this.new2 = namesArr;
                this.state.marks = marksArr;
                this.state.names = namesArr;
            })
            .catch(() => {
                console.log("error",this.stockname);

            });
    }


    submit = (event) => {//on submit(search bar)
        if (this.state.stock === "") {
          return;
        }
        event.preventDefault();
        this.resetUserInputs();
        if (this.current_user !== null) {//redirect
          window.location.replace("/search/"+this.current_user+"/"+this.state.stock);
        }
        else {
          window.location.replace("/search/"+this.state.stock);
        }
    }

    returnCurrentStock = () => {//return current stock
        const { stock } = useParams();
        const hide_stock = stock;
        return (
            <div id='hide_stock'><h1>{hide_stock}</h1></div>
        );
    }

    returnCurrentUser = () => {//return current user

      this.current_user = localStorage.getItem("loggedIn");

      return;
    }


    displayStocks = (marks) => {//display stock list

      if (!marks.length) return null;
      
      var show = marks.map((mark, indexs) =>(
        <div key={indexs} className="search_list" id={this.state.names[indexs] + "\n" + mark} onClick={()=>this.handleClick(this.current_user, mark)}>
          <div>{mark}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div>{this.state.names[indexs]}</div></div>

        </div>
      ));

      return show;
  }


  handleClick = (username, stock) => {//onclick (particular stock)

    if (this.current_user !== null) {//redirect
      window.location.replace("/search/"+username+"/"+stock);
    }
    else {
      window.location.replace("/search/"+stock);
    }
  }

  handleSearchbar=()=>{//search button
    if (this.state.stock === "") {
      return;
    }

    if (this.current_user !== null) {//redirect
      window.location.replace("/search/"+this.current_user+"/"+this.state.stock);
    }
    else {
      window.location.replace("/search/"+this.state.stock);
    }
  }

    render() {
      this.returnCurrentUser();
      this.init();
        return (
            <div>
                <Navbar />
                <div className="main">
                    <h1>Search Main Page</h1>
                </div>
                <form className = "search_bar" onSubmit={this.submit}>
                  <input type="search" className="input_search"
                  placeholder="Search Stock..."
                  onChange={this.handleSearchChange}
                  aria-label="Search through db" />
                  <button type="button" className="search_submit" onClick={this.handleSearchbar}>
                  <svg viewBox="0 0 1000 1000">
                  <path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path>
                  </svg></button>
                </form>
                <div>
                    {this.displayStocks(this.state.marks)}
                </div>
                <Logout />
            </div>
        );
    }
}

export default Home;
