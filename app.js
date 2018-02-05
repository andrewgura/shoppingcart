var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var sass = require('node-sass');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash')
var validator = require('express-validator');

var app = express();

//
//View Engine: HandleBars
//
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://admin:password@ds139619.mlab.com:39619/shoppingcartdb')
require('./passport.js')

//
//Use Sass
//
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());

//
//Set up static folder for imgs,styles
//
app.use(express.static(path.join(__dirname, 'public')));


//
//Import and use routes
//
var routes = require('./routes/index');
app.use(routes);

//
// Set Port
//
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});