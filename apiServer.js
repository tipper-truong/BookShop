var express = require('express'); // middleware, router
var cookieParser = require('cookie-parser'); // parse cookies
// bodyParser - handles http request, middleware module for express
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
var logger = require('morgan');
var bodyParser = require('body-parser'); 
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); // reads json request, responses 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

// API
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop'); // bookshop = name of database
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// SET UP SESSIONS 
// save session object to MongoDB
app.use(session({
	secret: 'mySecretString',
	saveUninitialized: false,
	resave: false,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
	store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60}) 
	// time to leave: 2 days * 24 hours * 60 minutes * 60 seconds
}))

// POST SESSION CART API
app.post('/cart', function(req, res) {
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err) {
		if(err) {
			throw err;
		}
		res.json(req.session.cart);
	})
})

// GET SESSION CART API
app.get('/cart', function(req, res) {
	if(typeof req.session.cart !== 'undefined') {
		res.json(req.session.cart);
	}
})
// END SESSION SET UP 

var Books = require('./models/books.js');

// POST BOOKS
app.post('/books', function(req, res){ // POST REQUEST
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

// GET BOOKS
app.get('/books', function(req, res) { // GET REQUEST
	Books.find(function(err, books) {
		if(err) {
			throw err;
		}
		res.json(books);
	})
});

// DELETE BOOKS 
app.delete('/books/:_id', function(req, res) {
	var query = {_id: req.params._id}; // get the book ._id

	Books.remove(query, function(err, books) {
		if(err) {
			console.log("Error", err);
		}
		res.json(books);
	})
});

// UPDATE BOOK
app.put('/books/:_id', function(req, res) {
	var book = req.body;
	var query = {_id: req.params._id};
	// If the field doesn't exist $set will set a new field
	var updateBook = {
		'$set': {
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	};
	// Get the newly updated record
	var options = {new: true};
	Books.findOneAndUpdate(query, updateBook, options, function(err, books) {
		if(err) {
			throw err;
		}
		res.json(books);
	});
})

app.get('/images', function(req, res) {
	const imgFolder = __dirname + '/public/images/';
	// Require file system
	const fs = require('fs');
	// Read all files in the directory
	fs.readdir(imgFolder, function(err, files) {
		if(err) {
			return console.error(err);
		}
		// Create an empty array
		const filesArr = [];
		// Iterate all images in the directory and add to the array
		files.forEach(function(file) {
			if(file != ".DS_Store") {
				filesArr.push({name: file});
			}
		})
		// send a json response
		res.json(filesArr);
	})
})

// END API
app.listen(3001, function(err) {
	if(err) {
		return console.log(err);
	}
	console.log("API Server is listening on http://localhost:3001");
})
