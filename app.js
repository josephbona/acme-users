var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var path = require('path');
var routes = {
  departments: require('./routes/departments'),
  customers: require('./routes/customers')
};
var app = express();

app.use(express.static(path.join( __dirname, '/public')));
swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/customers', routes.customers);
app.use('/', routes.departments);

module.exports = app;