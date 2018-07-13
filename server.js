const express = require('express')
const path = require('path');
const mongo = require('mongodb');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const monk = require('monk');
const db = monk('localhost:27017/user');
const fs = require('fs');

const app = express();
const port = 5000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(function(req,res,next){
    req.db = db;
    next();
});

const imagePath = path.join(path.resolve(__dirname, 'client/src/assets'), '/images');

app.use(express.static('client/src/assets/images'))

function getDirectoryContent(req, res, next) {
  fs.readdir(imagePath , function (err, images) {
    if (err) { return next(err); }
    res.locals.path = images;
    next();
  });
}


app.get('/api/images', getDirectoryContent, function(req, res) {
  res.send(res.locals.path);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
