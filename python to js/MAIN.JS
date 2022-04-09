const express = require('express');

const app = express();
let { PythonShell } = require('python-shell')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.get('/stock',(req,res)=>{
    res.sendFile("D:/chaos/CSCI3100_project-main (2)/CSCI3100_project-main/predict/python.html")
})
app.post('/stock',pythonProcsee)

function pythonProcsee(req,res){
   
    let option={
        args:[req.body['stock'],req.body['ci'],req.body['params']]
    }
    //option are those parameters we need to send to the python program
    PythonShell.run('prediction_tool.py',option,(err,result)=>{
        if(err) throw err;
        //const parsedString = JSON.parse(result)
        res.send(result)
        
        })
        
}

const server = app.listen(3000);