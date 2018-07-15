const express = require('express')
const path = require('path');
const mongo = require('mongodb');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const monk = require('monk');
const db = monk('localhost:27017/users');
const fs = require('fs');

const app = express();
const port = 8080;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// access databse

app.use(function(req,res,next){
    req.db = db;
    next();
});

// gets all images for gallery display

const imagePath = path.join(path.resolve(__dirname, 'client/src/assets'), '/images');

app.use(express.static(imagePath))

function getDirectoryContent(req, res, next) {
  fs.readdir(imagePath , function (err, images) {
    if (err) { return next(err); }
    res.locals.file = images;
    next();
  });
}

app.get('/api/images', getDirectoryContent, function(req, res) {
  // tests for jpg then sends files
  const regexp = /.jpg/;
  const images = [];
  res.locals.file.forEach(file => {
    if (regexp.test(file)) {
      images.push(file);
    }
  });
  res.send(images);
});

app.post('/api/add-image-to-account', function (req, res) {
  // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = 'James Harding';

    // Set our collection
    var collection = db.get('users');

    // Submit to the DB
    collection.update({ name: userName }, {
        $addToSet: {
          images: req.body.value,
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send(err);
        }
        else {
            // And forward to success page
            res.send("All is awesome")
        }
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
