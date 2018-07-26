const express = require('express')
const path = require('path');
const mongo = require('mongodb');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const monk = require('monk');
const db = monk('localhost:27017/pecs-app');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/users');

const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/pecs-app');

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

// new user

app.post('/api/sign-up', function(req, res) {
  console.log(req.body.email)
  var db = req.db;
  var collection = db.get('users');
  if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {
    console.log('success')
  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
    res.json(err)
    } else {
      res.json(user)
    }
  });
}

});


// find categories

app.post('/api/categories', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    User.findOne({ _id: req.body.userId }, { categories: 1 }
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

// return all user images

app.post('/api/user-gallery', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    User.findOne({ _id: req.body.userId }, { images: 1}
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

app.post('/api/user-category', function (req, res) {
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

// remove a category

app.post('/api/remove-category', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    User.update({ _id: req.body.userId }, {
        $pull: {
          categories: req.body.category,
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            res.json(req.body.category)
        }
    });
})

// add a category

app.post('/api/add-category', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    User.update({ _id: req.body.userId }, {
        $addToSet: {
          categories: req.body.category,
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            res.json(req.body.category)
        }
    });
})

// add a user input image url
app.post('/api/add-user-image', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    const image = {
      fileName: req.body.image,
      category: req.body.category,
    }
    User.update({ _id: req.body.userId }, {
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
            res.json(req.body.image)
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
      userSubmitted: req.body.userSubmitted,
    }
    User.update({ _id: req.body.userId }, {
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
            res.json(image)
        }
    });
})

app.post('/api/remove-image-from-account', function (req, res) {
    var db = req.db;
    var collection = db.get('users');
    const image = req.body.image
    collection.update({ _id: req.body.userId }, {
        $pull: { images : { fileName : image }, }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.json(err);
        }
        else {
            // And forward to success page
            res.json(doc)
        }
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
