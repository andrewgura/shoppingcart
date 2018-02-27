var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/user/signin', notLoggedIn, function(req, res) {
  var messages = req.flash('error');
  res.render('./user/signin', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/user/signin', notLoggedIn, passport.authenticate('local.signin', {
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true
}))

router.get('/user/signup', notLoggedIn, function(req, res) {
  var messages = req.flash('error');
  res.render('./user/signup', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/user/signup', notLoggedIn, passport.authenticate('local.signup', {
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
}))

router.get('/user/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
})

router.get('/user/profile', isLoggedIn, function(req, res) {
  res.render('./user/profile');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}