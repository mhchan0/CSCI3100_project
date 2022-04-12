import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";
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

    componentDidMount = () => {
        this.getMarks();

    };


    getMarks = () => {
        if (this.username_url !== ''){

            axios.get('/stocks')
            .then((response) => {
                const data = response.data;
                if (this.stock_asce === -1){
                    data.reverse();

                    this.setState({marks: data});

                    this.findStockName();
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


    displayMarks = (marks) => {

        if (!marks.length) return null;
        
        var show = marks.map((mark, indexs) =>(
          <div key={indexs} className="mark__display" onClick={()=>this.handleClick(this.username_url, mark.Symbol)}>
            <div>{this.state.names[indexs]}</div>
            <p>{mark.Symbol}</p>
          </div>
        ));

        return show;
    }
    

    findStockName =() => {
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


    handleClick = (username, stock) => {
        if (username !== null) {
            window.location.replace("/search/"+username+"/"+stock);
        }
        else {
            window.location.replace("/search/"+stock);
        }
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
            this.findStockName();
            
        }else{

            this.Arrr = [];

            //make a list , have Symbol and Name
            for (let i=0;i<this.state.marks.length;i++){
                this.Arrr.push({Symbol: this.state.marks[i].Symbol, Name: this.state.names[i]});
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
                marksArr.push({Symbol: this.Arrr[i].Symbol});
                namesArr.push(this.Arrr[i].Name);
            }

            this.setState({marks: marksArr});
            this.setState({names: namesArr});
        }

    }


    change_name = (e) => {
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
            marksArr.push({Symbol: this.Arrr[i].Symbol});
            namesArr.push(this.Arrr[i].Name);
        }

        this.setState({marks: marksArr});
        this.setState({names: namesArr});

    }


    returnCurrentUser = () => {
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