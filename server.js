const express = require('express')
const path = require('path');
const mongo = require('mongodb');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const monk = require('monk');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const logger = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();

// Routes
const userRoutes = require('./routes/User')

const url = process.env.MONGOLAB_URI;
// Database Setup
mongoose.Promise = global.Promise;
mongoose
	.connect(url, { useNewUrlParser: true })
	.then(() => console.log(chalk.green('Connected to DB')))
  .catch(err => console.log(chalk.red(`Error connecting to DB. Error: ${err}`)));

// Middleware
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', userRoutes)

// Start Server

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on Port:${PORT}`))
})

var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


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

app.post('/api/update-first-login', (req, res) => {
  User.update({ _id: req.body.userId }, {
    $set: { 'onboarding.firstLogin': false },
  }, function (err, doc) {
		if (err) {
			res.json(err)
		}
		else {
			res.json(doc)
		}
	});
})

app.use(express.static(path.join(__dirname, './client/build')));



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './client'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
