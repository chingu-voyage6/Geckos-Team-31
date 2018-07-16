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

// find categories

app.post('/api/categories', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.findOne({ _id: req.body.userId }, { categories: 1 }
      , function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            // And forward to success page
            res.json(doc);
        }
    });
})


// find user gallery by categories

app.post('/api/user-gallery', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.findOne(
      { _id: req.body.userId }
      , function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            // And forward to success page
            res.json(doc);
        }
    });
})

// add a category

app.post('/api/add-category', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.update({ _id: req.body.userId }, {
        $addToSet: {
          categories: req.body.category,
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            res.json(`Success`)
        }
    });
})

// add image object

app.post('/api/add-image-to-account', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    const image = {
      fileName: req.body.image,
      category: req.body.category,
    }
    collection.update({ _id: req.body.userId }, {
        $addToSet: {
          images: image,
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            // And forward to success page
            res.json(`You have added the image ${req.body.image} to your account`)
        }
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
