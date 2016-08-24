var expect = require('chai').expect;
var Promise = require('bluebird');
var Department = require('../models/department');
var db = require('../db');

describe('Departments', function() {
  beforeEach(function () {
    return db.sync({force: true});
  });

  it('can create departments that have name and isDefault fields', function() {
    return Department.create({
      name: 'Accounting'
    }).then(function(result) {
      expect(result.name).to.equal('Accounting');
      expect(result.isDefault).to.exist;
    });
  });
  it('can create multiple departments', function() {
    var createDepartmentOne = Department.create({name:'Accounting'});
    var createDepartmentTwo = Department.create({name:'Finance'});
    return Promise.all([createDepartmentOne,createDepartmentTwo]).then(function(results) {
      expect(results.length).to.equal(2);
    });
  });
  it('has a getDefault method that gets the default department or creates it if it doesn\'t exist', function() {
    var defDept = Department.getDefault();
    expect(defDept).to.be.ok;
  });
});