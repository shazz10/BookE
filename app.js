var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var upload = require('express-fileupload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorsRouter = require('./routes/doctors');
var medicinesRouter = require('./routes/medicines');
var retailersRouter= require('./routes/retailers');
var pathologistsRouter= require('./routes/pathologists');
var casesheetsRouter = require("./routes/casesheets");
var becomesRouter = require('./routes/becomes');
var uploadPrescription = require('./routes/upload_prescription');
var uploadQuotation = require('./routes/upload_quotation');
var uploadCerti = require('./routes/upload_certi');
var uploadReport = require('./routes/upload_report');
var appointmentRouter = require('./routes/appointments');
var ordersRouter = require('./routes/orders');
var eprescriptionsRouter = require('./routes/eprescriptions');
var servicesRouter = require('./routes/services');
var devicesRouter = require('./routes/devices');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(upload());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/doctors',doctorsRouter);
app.use('/api/medicines',medicinesRouter);
app.use('/api/retailers', retailersRouter);
app.use('/api/pathologists', pathologistsRouter);
app.use('/api/casesheets',casesheetsRouter);
app.use('/api/becomes',becomesRouter);
app.use('/api/uploadPrescription',uploadPrescription);
app.use('/api/uploadQuotation',uploadQuotation);
app.use('/api/uploadCerti',uploadCerti);
app.use('/api/uploadReport',uploadReport);
app.use('/api/appointments',appointmentRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/services',servicesRouter);
app.use('/api/eprescriptions',eprescriptionsRouter);
app.use('/api/devices',devicesRouter);


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
app.use(bodyParser.urlencoded({
  extended: true
}));

module.exports = app;
