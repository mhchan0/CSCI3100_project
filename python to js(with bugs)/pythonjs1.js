const express = require('express')
const app = express()
let { PythonShell } = require('python-shell')
let stock="AAPL"
let ci=0.9
let params=0.95
let options={
args:[stock,ci,params]}
PythonShell.run('prediction_tool.py',options,(err,result)=>{
if(err) throw err;
console.log(result)

})
