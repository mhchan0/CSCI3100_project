/**
 * PROGRAM rating.js - Program for users to rate
 * PROGRAMMER: CHAN, Man Ho
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To let user rate a stock and display user rating and the average ratings of a stock 
 * 
 * Refer to header comment block of functions for details of each function.
 */

import react, { Component } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

class Rating extends Component {
    
    current_stock = '';
    state = {
        username: '',
        rating: 0,
        stock: '',
        ratings: [],
        clicked: 0
    };
    rating = 0;
    username_ = 0;
    flag = 0;



    componentDidMount = () => {//react procedures

        this.displayRating();
        this.getRating();

    };
    

    returnCurrentUser = () => {//get current user and stock symbol

        const { username, stock } = useParams();
        const hide_username = username;
        this.username_ =  hide_username;
        this.state.username = hide_username;
        const hide_stock = stock;
        this.state.stock = hide_stock;
        this.current_stock = hide_stock;

    }


    getRating = () => {//get rating of stock
        axios.get('/ratings/all/'+this.state.stock)
        .then((response) => {
            const recv = response.data;
            this.setState({ ratings: recv });
        })
        .catch((err) => {
            console.log(err);
        });

    }


    submit = (event) => {//on submit, update rating

        if (this.state.username !== undefined) {
        if (this.flag !== 0) {

            this.setState({
                rating: event.target.id
            });

            const payload = {
              username: this.state.username,
              rating: event.target.id,
              stock: this.state.stock
            };
        
            axios({//send the rating to server
                url: '/ratings/update',
                method: 'put',
                data: payload
            })
            .then(() => {
                
            })
            .catch((err) => {
                console.log(err);
            });

            this.getRating();
            this.state.clicked = 1;
            window.location.reload();
            return;
        }

        }
        else {
            alert("Please log in to rate!");
        }

    };



    displayAvg = (ratings) => {//display average rating of stock
        if (!ratings.length) return "No one has rated yet";

        let sum = 0;
        let num = 0;

        for (const element of ratings) {
            num = num + 1;
            sum = sum + element.rating;
        }

        let avg = sum / num;
        avg = avg.toFixed(2);

        return (
            <div>
              <p>Average: {avg}</p>
            </div>
        );
    }


    clickStar = () => {//onclick rating star
        react.useEffect(() => {
            if (this.flag === 0) {
                if (this.state.rating !== 0) {
                    const element = document.getElementById(this.state.rating);
                    if (element != null) {
                        element.click();
                    }
                }
                this.flag = 1;
            }  
        }); 
    }
    

    displayRating = (rating) => {//display rating of stock

        if (this.state.username === undefined) {
            return (
                <div>
                    <p>Please log in to rate</p>
                </div>
            );
        }

        if (this.flag === 0){// if user have logged in
        if (this.state.stock !== ''){
        if (this.state.username !== ''){
        axios.get('/ratings/'+this.state.stock+'/'+this.state.username)
        .then((response) => {
            const recv = response.data;
            this.rating= recv;

        })
        .catch((err) => {
            console.log(err);
        });}}
        if (this.rating === 0){//if user have not rated yet
            return (
                <div>
                  <p>You have not rated</p>
                </div>
            );
        }else{
            return (
            <div>
              <p>You have rated: {this.rating}</p>
            </div>
        );
        }
        
        }else if (this.flag === 1){//user not logged in 
        if (this.rating === 0 && rating === 0) {

            return (
                <div>
                  <p>You have not rated</p>
                </div>
            );
        }
        else {
            if (rating !== 0){
                return (
                    <div>
                    <p>You have rated: {rating}</p>
                    </div>
                );
            }
            if (this.rating !== 0){
                return (
                    <div>
                    <p>You have rated: {this.rating}</p>
                    </div>
                );
            }
            
        }        
        }
    }



    returnCurrentStock = () => {//return current stock

        const { stock } = useParams();
        const hide_stock = stock;
        this.state.stock = hide_stock;
        this.current_stock = hide_stock;
    }




    render() {

          
        return(
            
            <div>
                <div>
                    <this.returnCurrentUser />
                    <this.returnCurrentStock />
                </div>
                
                <div className="rating">
                    <input type='radio' value="5" name="rating" id="5" onClick={this.submit}></input><label for="5">&#x2606;</label>
                    <input type='radio' value="4" name="rating" id="4" onClick={this.submit}></input><label for="4">&#x2606;</label>
                    <input type='radio' value="3" name="rating" id="3" onClick={this.submit}></input><label for="3">&#x2606;</label>
                    <input type='radio' value="2" name="rating" id="2" onClick={this.submit}></input><label for="2">&#x2606;</label>
                    <input type='radio' value="1" name="rating" id="1" onClick={this.submit}></input><label for="1">&#x2606;</label>
                </div>
                <this.clickStar />
                <div><this.returnCurrentUser />
                    {this.displayRating(this.state.rating)}
                </div>
                <div>
                    {this.displayAvg(this.state.ratings)}
                </div>
            </div>
        );

    }
}

export default Rating;
