var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios')
require('dotenv').config();
require('./config/mongoose');
console.log(process.env.PORT)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var pedidosRouter = require('./routes/pedidos');
var app = express();
connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/pedidos', pedidosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

function listen() {
  //if (app.get('env') === 'test') return;
  //app.listen(port);
  //console.log('Express app started on port ' + port);
}

function connect() {
  try {
    mongoose.connection
      .on("error", console.log)
      .on("disconnected", connect)
      .once("open", listen);
    var connection = require('./config/mongoose');
    return connection;
    // return mongoose.connect(config.db, {
    //   keepAlive: 1,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    // return mongoose.connect(
    //   "mongodb+srv://madblake:BfRENT0032mj@cluster0.6h14v.mongodb.net/test?retryWrites=true&w=majority",
    //   //"mongodb://madblake:BfRENT0032j.@cluster0-shard-00-00.6h14v.mongodb.net:27017,cluster0-shard-00-01.6h14v.mongodb.net:27017,cluster0-shard-00-02.6h14v.mongodb.net:27017/test?ssl=true&replicaSet=atlas-8mzev4-shard-0&authSource=admin&retryWrites=true&w=majority",
    //   {
    //     useNewUrlParser: true,
    //     //useUnifiedTopology: true,
    //     ssl: true,
    //   }
    //);
  } catch (e) {
    console.log(e.message);
  }
}
module.exports = app;
