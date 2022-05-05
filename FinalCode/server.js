const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

const comment = require('./routes/comment.api');
const rating = require('./routes/rating.api');
const user = require('./routes/user.api');
const stock = require('./routes/stock.api');
const bookmark = require('./routes/bookmark.api');
const { param } = require('./routes/comment.api');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
let { PythonShell } = require('python-shell');
const R = require('r-integration');

app.use(morgan('tiny'));
app.use('/comments', comment);
app.use('/ratings', rating);
app.use('/users', user);
app.use('/stocks', stock);
app.use('/bookmark', bookmark);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'client/public/img')
  },
  filename: function (req, file, cb) {
    
    cb(null, req.params.username + ".jpg" )
  }
});

const upload = multer({ storage: storage }).single('file');

app.post('/upload/:username',function(req, res) {
     //upload with username
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.post('/prediction/test', function(req, res){
        //console.log("debugggg", req.body);
        var fs = require('fs');
        //delete stock graph before generating a new graph
        fs.unlink('./client/public/stock_graph/'+req.body.stock+'.jpg', function (err) {
            console.log('File deleted!');
        });
        let option={
            args:[req.body.stock,(req.body.CI/100),(req.body.params/100)]
        };
         //option are those parameters we need to send to the python program
        let option2={args:[req.body.stock]};
        //can add one more para for the date
		PythonShell.run("data_downloader.py",option2,(err,result)=>{});
        //update data by calling python script
        let result = R.callMethod("basic_stats_computer.R", "arma_garch_pred", {symbol: req.body.stock, m: parseFloat( req.body.m),use_period:parseFloat( req.body.use_period)});
        //update data by calling R function

    
        PythonShell.run('metrics_computer.py',option,(err,result)=>{

            res.send(result);
            //send the result
            
            });
    
});

app.post('/stockdata', function(req, res) {
    let options = {
        args: [req.body.stock, req.body.previous]
    };
    PythonShell.run("data.py", options, (err, result) => {

        //if (err) throw err;
        res.send(result);
    });
    
})

app.listen(PORT, console.log('Server is starting at '+PORT ));