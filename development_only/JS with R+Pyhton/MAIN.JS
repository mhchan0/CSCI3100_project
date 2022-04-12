const express = require('express');

const app = express();
let { PythonShell } = require('python-shell')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const R = require('r-integration');


app.get('/stock',(req,res)=>{
    res.sendFile("D:/chaos/CSCI3100_project-main (2)/CSCI3100_project-main/predict/python.html")
})
//send the form

app.post('/stock',pythonProcess)

function pythonProcess(req,res){
   
    let option={
        args:[req.body['stock'],req.body['ci']/100,req.body['params']]
    }
     //option are those parameters we need to send to the python program
    let option2={args:[req.body['stock']]}
    //can add one more para for the date

    let result = R.callMethod("prediction.R", "arma_garch_pred", {ticker: req.body['stock'], m: parseFloat( req.body['u']),use_period:parseFloat( req.body['use_period'])});
    //update data by calling R function
    PythonShell.run("data_downloader.py",option2,(err,result)=>{})
    //update  data by calling python script

    PythonShell.run('prediction_tool.py',option,(err,result)=>{
        if(err) throw err;
        
        res.send(result)
        //send the result
        })
        
}

const server = app.listen(3000);