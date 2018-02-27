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
var MongoStore = require('connect-mongo')(session);

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
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



//
//Import and use routes
//
var routes = require('./routes/index');
var userRoutes = require('./routes/user')


//Check to see if there user is signed in
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use(userRoutes);
app.use(routes);

//
// Set Port
//
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});