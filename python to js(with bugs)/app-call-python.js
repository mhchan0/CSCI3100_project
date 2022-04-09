import { createRequire } from 'module';
//const { createRequire } = require('module');
const require = createRequire(import.meta.url);
let {PythonShell} = require(['python-shell'])
//import PythonShell from 'python-shell';
const express = require('express')
const app = express()
function stock(){
    //let stock=document.getElementById("stockname").value
    //let ci=document.getElementById("ci").value
    //let params=document.getElementById("params").value
    print('start')
    let sotck="APPL"
    let ci=0.9
    let params=0.95
let options={
    args:[stock,ci,params]}
    //options are are those we need to transfer to the python script
PythonShell.run('prediction_tool.py',options,(err,result)=>{
    if(err) throw err;
    console.log(result)
    
})
}



