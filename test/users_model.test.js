var expect = require('chai').expect;
var Promise = require('bluebird');
var User = require('../models/user');
var db = require('../db');

describe('Users', function() {
  beforeEach(function () {
    return db.sync({force: true});
  });
});