import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import Logout from './logout';
import Comment from './comment';

class Search extends Component {
    state ={
        stock: ''
    }
    stock_url = "";
    current_user = "";

    resetUserInputs = () => {
        this.setState({
          stock: ''
        });
      };


    handleSearchChange = (e) => {
        this.setState({
          stock: e.target.value
        });
      };


    submit = (event) => {//on submit
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

    returnCurrentUser = () => {//get current user

      this.current_user = localStorage.getItem("loggedIn");

      return;
    }

    handleSearchbar=()=>{//search
      if (this.state.stock === "") {
        return;
      }

      if (this.current_user !== null) {
        window.location.replace("/search/"+this.current_user+"/"+this.state.stock);
      }
      else {
        window.location.replace("/search/"+this.state.stock);
      }
    }

    render() {
      this.returnCurrentUser();
        return (
            <div>
                
                <div className="main">

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
                <Comment />
                <Logout />
            </div>
        );
    }
}

export default Search;