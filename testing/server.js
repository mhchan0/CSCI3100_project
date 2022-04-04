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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(morgan('tiny'));
app.use('/comments', comment);
app.use('/ratings', rating);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'client/src/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(PORT, console.log('Server is starting at '+PORT ));