import react, { Component } from 'react';
import axios from 'axios';

class Rating extends Component {
    
    state = {
        username: 'test_user',
        rating: 0,
        stock: '',
        ratings: []
    };

    flag = 0;

    componentDidMount = () => {
        this.getRating();
    };

    getRating = () => {
        axios.get('/ratings')
        .then((response) => {
            const data = response.data;
            this.setState({ ratings: data });
            console.log('Data has been received.');
        })
        .catch(() => {
            alert('Error retrieving data.');
        });
    }

    submit = (event) => {
        
        if (this.flag !== 0) {

            this.setState({
                rating: event.target.id
            });

            const payload = {
              username: this.state.username,
              rating: event.target.id,
              stock: this.state.stock
            };
        
        
            axios({
                url: '/ratings/save',
                method: 'POST',
                data: payload
            })
            .then(() => {
                console.log('Data has been sent to the server.');
            })
            .catch((err) => {
                console.log(err);
            });

            this.getRating();

        }
    };

    displayRating = (rating) => {
        if (rating === 0) {
            return (
                <div>
                    <></>
                  <p>You have not rated</p>
                </div>
            );
        }
        else {
            return (
                <div>
                  <p>{rating}</p>
                </div>
            );
        }
    }

    displayAvg = (ratings) => {
        if (!ratings.length) return null;

        let sum = 0;
        let num = 0;

        for (const element of ratings) {
            num = num + 1;
            sum = sum + element.rating;
        }

        let avg = sum / num;
        avg = avg.toFixed(2)

        return (
            <div>
              <p>{avg}</p>
            </div>
        );
    }

    clickStar = () => {
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
    
    render() {

        return(
            <div>
                <div className="rating">
                    <input type='radio' value="5" name="rating" id="5" onClick={this.submit}></input><label for="5">&#x2606;</label>
                    <input type='radio' value="4" name="rating" id="4" onClick={this.submit}></input><label for="4">&#x2606;</label>
                    <input type='radio' value="3" name="rating" id="3" onClick={this.submit}></input><label for="3">&#x2606;</label>
                    <input type='radio' value="2" name="rating" id="2" onClick={this.submit}></input><label for="2">&#x2606;</label>
                    <input type='radio' value="1" name="rating" id="1" onClick={this.submit}></input><label for="1">&#x2606;</label>
                </div>
                <this.clickStar />
                <div>
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