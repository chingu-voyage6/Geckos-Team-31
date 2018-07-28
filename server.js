const express = require('express')
const path = require('path');
const mongo = require('mongodb');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const monk = require('monk');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/users');
const Session = require('./models/sessions');
const session = require('express-session');
const app = express();
const port = 8080;
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/pecs-app', { useNewUrlParser: true });

var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// access databse

app.use(function(req,res,next){
    req.db = db;
    next();
});

// session middleware

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


// login - out and session verify

  app.post('/api/sign-up', function(req, res) {
    if (req.body.password !== req.body.passwordConf) {
     var err = new Error('Passwords do not match.');
     err.status = 400;
     return next(err);
    }
    if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
      console.log('success')
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    User.create(userData, function (err, user) {
      if (err) {
      res.json(err)
      } else {
        res.json(user._id)
      }
    });
  }

  });



app.post('/api/log-in', function(req, res, next) {
  if (req.body.email && req.body.password) {
   User.authenticate(req.body.email, req.body.password, function (error, user) {
       if (error || !user) {
         var err = new Error('Wrong email or password.');
         err.status = 401;
         return res.json(err.message);
      } else {
         req.session.userId = user._id;
         return res.json(req.session.userId);
       }
     });
   } else {
    var err = new Error('All fields required.');
    err.status = 400;
     return res.json(err.message);
   }
})


app.post('/api/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


app.post('/api/verify', (req, res, next) => {
  Session.findOne({ userId : req.body.userId })
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.json('success')
        }
      }
    });
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
    User.findOne(
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
    const image = req.body.image
    User.update({ _id: req.body.userId }, {
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
