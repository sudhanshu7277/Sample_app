process.env.NODE_ENV = 'development';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./server/udfqueue_database');
var app = express();

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json());

console.log(app.settings.env);

app.use('/', routes);

// view engine setup
var path = require('path');
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'jade');



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
//          res.render('error', {
//          message: err.message,
//          error: err
//        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    next(err);
//          res.render('error', {
//          message: err.message,
//          error: err
//        });
});


module.exports = app;

app.listen(5000);
console.log("Server running on port 5000");
