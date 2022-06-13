const express = require('express');

var mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://stu088:p106260-@csci2720.m2qbq.mongodb.net/stu088');
const db = mongoose.connection;





const userschema=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verif:{type:Number},
    //verif=0 if not verf,1 if verf
    verifnumber:{type:Number}
});

const User = mongoose.model('user',userschema);

db.once('open', function () {
User.deleteMany({},(err,result)=>{
        if(err)
       console.log('cannot delete')
       else 
       console.log('user deleted')
    });
 
    console.log("Connection is open...");
})
//delete all user when connect to the server, just for test



app.use(bodyParser.urlencoded({extended:false}
));


app.post('/createaccount',(req,res)=>{
    User.findOne({email:req.body['email']},(err,result)=>{
        if(result!=null)
        return res.send('email was used'+result)
        else{
        const newuser= new User({email:req.body['email'],password:req.body['password'],verif:0})
        newuser.save().then((result)=>{res.send('please check your email')})}
    })
})
//req=input in the register form, user will go to this website after they submit the form


app.get('/verf/:email',(req,res)=>{
    User.findOne({email:req.params['email']},(e,result)=>{
        if(result==null)
        return res.send('user does not exist')
        else{
            result.verif=1;
            result.save();
            res.send('verification success')
        }
    })
})

app.get('/register',(req,res)=>{
    
    res.sendFile('D:/chaos/lab6/project/registerform.html')
})
//send the html form


app.get('/email.js',(req,res)=>{
    res.sendFile('D:/chaos/lab6/project/email.js')
})
//for the html load email.js



app.get('/login',(req,res)=>{
    res.sendFile('D:/chaos/lab6/project/loginform.html')
})
//send the login form
app.post('/login',(req,res)=>{
    User.findOne({email:req.body['email'],password:req.body['password']},(err,result)=>{
        if(result==null) 
        return res.send('user does not exist')
        //if the user does not exist
        else{
            if (result.verif==0)
            return res.send('please check the verification email')
            //if user exist but not verif
            else 
            return res.send('login successfully')
        }
    })

})


//get(forgetpassword)->post(forgetpassword)->get(changepassword)->post(changepassword)
app.get('/forgetpassword',(req,res)=>{
    res.sendFile('D:/chaos/lab6/project/forgetpassword.html')
}
)

app.post('/forgetpassword',(req,res)=>{
    User.findOne({email:req.body['email']},(err,e)=>{
        if(e==null)
        return res.send('account does not exist')
        else
        res.send('Please check your mailbox')

    }
    )
})

app.get('/changepassword',(req,res)=>{
    res.sendFile('D:/chaos/lab6/project/changepassword.html')
})

app.post('/changepassword',(req,res)=>{
    User.findOne({email:req.body['email']},(err,e)=>{
        if(e==null)
        return res.send('something is wrong')
        else{
            e.password=req.body['password']
            e.save();
            res.send('Password change successfully')
        }
    })
})
const server = app.listen(3000);