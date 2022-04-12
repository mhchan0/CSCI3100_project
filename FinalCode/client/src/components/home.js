import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";
import Navbar from './navbar';
import Logout from './logout';
import axios from 'axios';

class Home extends Component {

    //yahooFinance = require('yahoo-finance');
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

    componentDidMount = () => {
        this.getMarks();

    };


    getMarks = () => {
        if (this.username_url !== ''){

            axios.get('/bookmark/'+this.username_url+'/'+this.stock_asce)
            .then((response) => {
                const data = response.data;

                this.setState({marks: data});
                for (let i=0; i<this.state.marks.length; i++){
                    this.findStockName(this.state.marks[i].stock);
                }

            })
            .catch(() => {
                alert('No such data.');
            });

        }
      }


    displayMarks = (marks) => {

        if (!marks.length) return null;
        
        var show = marks.map((mark, indexs) =>(
          <div key={indexs} className="mark__display" onClick={()=>this.handleClick(mark.username, mark.stock)}>
            <div>{this.state.names[indexs]}</div>
            <p>{mark.stock}</p>
          </div>
        ));

        return show;
    }
    

    findStockName =(stockname_url) => {
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


    handleClick = (username, stock) => {
        window.location.replace("/search/"+username+"/"+stock);
    }


    returnCurrentUser = () => {
        const { username } = useParams();
        const hide_username = username;
        this.username_url = hide_username;
        return 0;
    }


    change_asc = (e) => {
        this.setState({names: []});
        this.stock_asce = this.stock_asce * -1;
        if (this.sort_wt === 1){
            this.getMarks();
        }else{
            //this.setState({names: []});
            this.Arrr = [];

            //make a list , have Symbol and Name
            for (let i=0;i<this.state.marks.length;i++){
                this.Arrr.push({Symbol: this.state.marks[i], Name: this.state.names[i]});
            }
            if (this.stock_asce === 1){
                this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name));

            }
            if (this.stock_asce === -1){
                this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name)).reverse();

            }
            this.setState({marks: []});
            this.setState({names: []});
            var marksArr = [];
            var namesArr = [];
            for (let i=0;i<this.Arrr.length; i++){
                marksArr.push(this.Arrr[i].Symbol);
                namesArr.push(this.Arrr[i].Name);
            }

            this.setState({marks: marksArr});
            this.setState({names: namesArr});
        }

    }


    change_name = (e) => {
        if (this.sort_wt === -1){
            this.sort_wt = this.sort_wt * -1;
            this.setState({names: []});
            this.getMarks();
            return;
        }
        this.sort_wt = this.sort_wt * -1;
        this.setState({names: []});
        this.Arrr = [];

        //make a list , have Symbol and Name
        for (let i=0;i<this.state.marks.length;i++){
            this.Arrr.push({Symbol: this.state.marks[i], Name: this.state.names[i]});
        }
        if (this.stock_asce === 1){
            this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name));

        }
        if (this.stock_asce === -1){
            this.Arrr = this.Arrr.sort((a,b) => a.Name.localeCompare(b.Name)).reverse();

        }
        this.setState({marks: []});
        this.setState({names: []});
        var marksArr = [];
        var namesArr = [];
        for (let i=0;i<this.Arrr.length; i++){
            marksArr.push(this.Arrr[i].Symbol);
            namesArr.push(this.Arrr[i].Name);
        }

        this.setState({marks: marksArr});
        this.setState({names: namesArr});

    }


    returnCurrentUser = () => {
        this.username_url = localStorage.getItem("loggedIn");
        return;
    }


    gopop = () =>{
        if (this.username_url !== null) {
            window.location.replace("/home/"+this.username_url+"/popular");
        }
    }

    gomark = () =>{
        if (this.username_url !== null) {
            window.location.replace("/home/"+this.username_url);
        }
        else {
            alert("Please log in to use the mark function!");
        }
    }


    yahootest = () =>{

    }

    returnText = () => {
        if (this.username_url !== null) {
            return (
                <h4>Your marked stock:</h4>
            );
        }
        else {
            return (
                <h4>Popular stock:</h4>
            );
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
                <div >{this.yahootest()}</div>
                <div className="popp">
                <div className="pop" id="pop_left" onClick={this.gopop} style={{ borderRight: 'none'}}>Popular Stock</div>
                <div className="pop" id="pop_right" onClick={this.gomark}>Marked Stock</div>
                </div>
                <div><this.returnText /></div>
                
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

export default Home;