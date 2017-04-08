const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const secrets = require('./config/secrets');
const routes = require('./config/routes');
const locals = require('./config/locals');
const db = require('./config/db');
const auth = require('./lib/auth');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// use ejs as default engine
app.set('view engine', 'ejs');

// disable view cache for development
if (app.get('env') === 'development') {
  app.set('view cache', false);
  app.use(logger('dev'));
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 2); // trust first two proxies (nginx and cloudflare) 
  app.use(logger('combined'));
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser(secrets.secret));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
app.use(session({
  secret: secrets.secret,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(auth.populate());


locals(app);
db(app);

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
