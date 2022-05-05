/**
 * PROGRAM comment.js - Program for get and display comments of stocks
 * PROGRAMMER: LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To get comment records of stock from database and display comments of stocks to webpage
 * 
 * Refer to header comment block of functions for details of each function.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Rating from './rating';
import Navbar from './navbar';
import Predict from './predict';
import StockInfo from './stockinfo'

class Comment extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    username:'',
    body: '',
    stock: '',
    year: '',
    month: '',
    day: '',
    posts: []
    
  };
  stock_url = '';
  username_url = '';
  stockname_url = '';
  stockname='';
  marking = 0;
  flag = 0;
  mark= false;
  componentDidMount = () => {
    this.getComment();

  };


  getComment = () => { //to get comments
    if (this.state.stock !== ''){

    axios.get('/comments/'+this.state.stock)
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
      })
      .catch(() => {
        window.location.replace("/search_main/"+this.username_url);
      });
    }else{
      window.location.replace("/search_main/"+this.username_url);
    }
    
  }


  handleCommentChange = (e) => {//handle comment change
    this.setState({
      body: e.target.value
    });
  };


  submit = (event) => {//click submit to use this function
    if (this.username_url === null) {
      alert("Please log in to comment!");
    }

    event.preventDefault();

    let date = new Date();

    const payload = {//make payload for sending to server
      username: this.state.username,
      body: this.state.body,
      stock: this.state.stock,
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate()
    };
    
    if (payload.body !== '') {

      axios({//sent to server
        url: '/comments/save',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server.');
          this.resetUserInputs();
          this.getComment();
        })
        .catch(() => {
          console.log('Internal server error.');
        });

    }
  };


  resetUserInputs = () => {//reset user input
    this.setState({
      body: ''
    });
  };


  displayComment = (posts) => {//display comments

    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="comment__display">
        <h3>{post.username}</h3>
        <p>{post.body}</p>
        <p align="right"><small>{post.day}/{post.month}/{post.year}</small></p>
      </div>
    ));
  }


  returnCurrentStock = () => {//show current stock name and symbol
      const { stock } = useParams();
      const hide_stock = stock;
      this.stock_url = hide_stock;
      this.state.stock = this.stock_url;

      //show by html code
      return (
        <h1 className='lastla'>{this.stockname} ( <div className='lastla' id='hide_stock'>{hide_stock}</div> )</h1>
      );
  }


  returnCurrentUser = () => {//return current user
      const { username } = useParams();
      const hide_username = username;
      this.username_url = hide_username;
      this.username_url = localStorage.getItem("loggedIn");
      this.state.username= this.username_url;

      return;
  }


  returnCurrentStockName = () => {//return current stock name
    const { stock } = useParams();
    const hide_stockname = stock;
    this.stockname_url = hide_stockname;
    
  }


  checkexist= ()=> {// check if stock exist
    if (this.stockname_url!==''){
      axios.get('/stocks/'+this.stockname_url)//get related stock symbol
      .then((response) => {
        const data = response.data;
        this.stockname = data.Name;
        
        if (this.state.stock !== data.Symbol){
          if (data !== 0){//if we found out the related stock
            if (this.username_url !== null) {
              window.location.replace("/search/"+this.username_url+"/"+data.Symbol);
            }
            else {
              window.location.replace("/search/"+data.Symbol);
            }
          }else{// if not such stock
            alert('No similar stock.');
            if (this.username_url !== null) {
              window.location.replace("/search_main/"+this.username_url); 
            }
            else {
              window.location.replace("/search_main/");
            }
          }
        }
        
      })
      .catch(() => {

        if (this.username_url !== null) {//redirect when error occur
          window.location.replace("/search_main/"+this.username_url);
        }
        else {
          window.location.replace("/search_main/");
        }
      });
    }

    if (this.stockname === 0){//if redirection not working, redirect again
      alert("No such stock");
      if (this.username_url !== null) {
        window.location.replace("/search_main/"+this.username_url);
      }
      else {
        window.location.replace("/search_main/");
      }
    }
    return ;
  }


  submitmark =(event)=>{//submit record of bookmark for user
    event.preventDefault();
    const payload = {
      username: this.state.username,
      stock: this.state.stock
    };
    
    this.mark= !this.mark ;
    
    var property = document.getElementById("btn");
    if (this.mark) {//if not marked, update mark to db. if marked,  unmark it
      property.style.backgroundColor = "#ffee00";
      axios({//send to db
          url: '/bookmark/update',
          method: 'put',
          data: payload
      })
      .then(() => {
          console.log('Data has been sent to the server.');
      })
      .catch((err) => {
          console.log(err);
      });

    }
    else {
        property.style.backgroundColor = "transparent";
        axios({//del from db
            url: '/bookmark/delete',
            method: 'put',
            data: payload
        })
        .then(() => {
            console.log('Data has been sent to the server.');
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    return;
  }
  

  returnCurrentMark = () => {// return current mark
    if (this.stockname_url!==''){
    axios.get('/bookmark/find/'+this.username_url+'/'+this.stockname_url)
      .then((response) => {
        const data = response.data;
        var property = document.getElementById("btn");
        if (data === 0){
          property.style.backgroundColor = "transparent";
          this.mark= false;
        }
        if (data === 1){
          property.style.backgroundColor = "#ffee00";
          this.mark= true;
        }
        
        console.log('Data has been received.');
      })
      .catch(() => {
        console.log("err",this.stockname);
        
      });
    }
    
  }


  returnBookmark = () => {//return bookmark in html code
    const { username } = useParams();
    if (username !== undefined) {
      return (
        <div>
        <button className="mark" id= "btn" onClick={this.submitmark}>
        <svg viewBox="0 0 16 16"> <path fill= "blue" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/> </svg>
        </button>
        </div>
      );
    } 
  }

  returnTextArea = () => {//return text area in html code
    if (this.username_url !== null) {
      return (
        <textarea className="write_comment"
                placeholder="comment"
                name="comment"
                cols="30"
                rows="10"
                value={this.state.body}
                onChange={this.handleCommentChange}
              >

              </textarea>
      );
    }
    else {
      return (
        <textarea className="write_comment"
                placeholder="Please log in to comment"
                name="comment"
                cols="30"
                rows="10"
                readOnly
              >

              </textarea>
      );
    }
  }



  render() {
    
    return(
      <div>
        <Navbar />
        <div className="main">
            <this.returnBookmark/>
            
            <this.returnCurrentUser/>
            <this.returnCurrentMark/>
        </div>
        <div className="main">
            <this.returnCurrentStockName/><this.checkexist/><this.returnCurrentStock/>
        </div>
        <StockInfo />
        <Predict />
        <br/>
        <br/>
        <div className="main">
          <Rating />
          <form onSubmit={this.submit}>
            <div className="form-input">
              <this.returnTextArea />
            </div>

            <button className="submit_button">Submit</button>
          </form>

          <div className="comment-">
            {this.displayComment(this.state.posts)}
          </div>
        </div>
      </div>
    );
  }
}


export default Comment;
