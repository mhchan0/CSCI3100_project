import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './navbar';
import Rating from './rating';

class Comment extends Component {

  state = {
    username:'test_user',
    body: '',
    stock: '',
    year: '',
    month: '',
    day: '',
    posts: [],
  };

  componentDidMount = () => {
    this.getCommet();
  };


  getCommet = () => {
    axios.get('/comments')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received.');
      })
      .catch(() => {
        alert('Error retrieving data.');
      });
  }

  handleCommentChange = (e) => {
    this.setState({
      body: e.target.value
    });
  };


  submit = (event) => {
    event.preventDefault();

    let date = new Date();

    const payload = {
      username: this.state.username,
      body: this.state.body,
      stock: "",
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate()
    };

    if (payload.body !== '') {

      axios({
        url: '/comments/save',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server.');
          this.resetUserInputs();
          this.getCommet();
        })
        .catch(() => {
          console.log('Internal server error.');
        });;

    }
  };

  resetUserInputs = () => {
    this.setState({
      body: ''
    });
  };

  displayComment = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="comment__display">
        <h3>{post.username}</h3>
        <p>{post.body}</p>
        <p align="right"><small>{post.day}/{post.month}/{post.year}</small></p>
      </div>
    ));
  }

  render() {

    console.log('State: ', this.state);

    return(
      <div>
        <Navbar />
        <form className = "search_bar">
          <input type="search" className="input_search"
          placeholder="Search Stock..."
          aria-label="Search through db"/>
          <button className="search_submit"><svg viewBox="0 0 1000 1000">
          <path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path>
          </svg></button>
        </form>
        <div className="main">
            <h1>Stock Name</h1>
        </div>

        <div className="main">
          <Rating />
          <form onSubmit={this.submit}>
            <div className="form-input">
              <textarea className="write_comment"
                placeholder="comment"
                name="comment"
                cols="30"
                rows="10"
                value={this.state.body}
                onChange={this.handleCommentChange}
              >

              </textarea>
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