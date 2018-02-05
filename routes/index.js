var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');

router.get('/', function(req, res) {
  Product.find(function(err, docs) {
    res.render('index', {
      products: docs
    });
  })
});

router.get('/user/signup', function(req, res) {
  var messages = req.flash('error');
  res.render('./user/signup', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.get('/user/profile', function(req, res) {
  res.render('./user/profile');
});

router.get('/user/signin', function(req, res) {
  res.render('./user/signin');
});


router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
}))

module.exports = router;