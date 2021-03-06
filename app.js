var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate');

var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');
const Promos = require('./models/promos');
const Leaders = require('./models/leaders');
const User = require('./models/user')

const url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url).then((client) => {
    console.log('Connected to the Server');
}, (err) => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUninitialized: false,
	resave: false,
	store: new FileStore()

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);

function auth (req, res, next) {
    console.log(req.user);
    if(!req.user){
        let err = new Error('You are not authenticated');
        res.setHeader('Content-Type', 'application/json');
        err.status = 401;
        next(err);
    }
    else {
        next();
    }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dishRouter);
app.use('/', promoRouter);
app.use('/', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;