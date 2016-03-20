var express = require('express');
var router = express.Router();
var User = require('../models/user');
var qg = require("../modules/questiongenerator.js");
var crypto = require("crypto");
var redis = require("redis"),
    client = redis.createClient();

var generate_key = function() {
	console.log('genkey');
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/signin');
}


module.exports = function(passport) {
	/* GET login page. */
	router.get('/signin', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('home', { message: req.flash('message') });
	});

	router.get('/api/ping', function (req,res,next) {
		if (req.isAuthenticated())
			res.json({'auth':true});
		else
			res.json({'auth':false});
	});

	router.post('/savetemp', function(req,res,next) {
		console.log(req.session.miid);
		console.log(req.body.data);
		client.set(req.session.miid, JSON.stringify(req.body.data));
		res.send(200);
	})

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/', function(req, res){
		if(!req.isAuthenticated()) {
			req.session.miid = generate_key();
			res.render('home', { user: req.user });
		} else {
			// if authed, check redis for unstored questions & add them
			client.get(req.session.miid, function(err,data) {
				data = JSON.parse(data);
				if(!data){
					req.session.miid='';
					res.render('home', { user: req.user });
				} else {
					client.del(req.session.miid);
					req.session.miid='';
					User.addQuestions(req.user, data, function(e) {
						res.render('home', { user: req.user });
					});
				}
			})
		}
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook',
		passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/signin'
		})
	);

	/* question generator api */
	router.post('/api/generate', function(req, res, next) {
		qg.generateQuestion(req.body.text, function(data) {
			res.send(data);
		});
	});

	/* generate question form */
	router.get('/generate', isAuthenticated, function(req, res, next) {
		res.render('generate', { user: req.user });
	});

	/* generate question */
	router.post('/generate', isAuthenticated, function(req, res, next) {
		User.addQuestion(req.user, req.body.question, req.body.answer, function(err) {
			res.json({message: 'added!'});
		});
	})

	router.get('/questions', isAuthenticated, function(req,res,next) {
		User.getUserQuestions(req.user, function(data) {
			console.log(data);
			res.json(data);
		})
	})

	/* create question form */
	router.get('/create', isAuthenticated, function(req,res,next) {
		res.render('create', { user: req.user });
	});

	/* create question */
	router.post('/create', isAuthenticated, function(req,res,next) {
		User.addQuestions(req.user, req.body.data, function(e) {
			res.json(200);
		});
	});

	/* delete question */
	router.delete('/create', isAuthenticated, function(req,res,next) {
		User.deleteQuestion(req.user, req.body.id, function(err) {
			res.json({message: "removed!"});
		})
	});

	router.get('/deletequestion', isAuthenticated, function(req,res,next) {
		User.deleteQuestion(req.user, req.query.id, function(err) {
			res.json({message: "removed!"});
		})
	});

	router.get('/settings', isAuthenticated, function (req,res,next) {
		
	})

	return router;
}





