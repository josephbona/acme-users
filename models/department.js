var db = require('../db');
var Sequelize = require('sequelize');
var User = require('./user');
var Department = db.define('Department', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isDefault: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  classMethods: {
    getDefault: function() {
      return Department.findOne({
        where: {
          isDefault: true
        }
      }).then(function(result) {
        if(!result) {
          Department.create({
            name: 'Human Resources',
            isDefault: true
          }).then(function(result) {
            return result;
          });
        }
        return result;
      }).catch(function(err) {
        throw err;
      });
    }
  },
  instanceMethods: {
    setDefault: function() {
      var current = this;
      return Department.getDefault().then(function(result) {
        result.isDefault = false;
        return result.save();
      }).then(function() {
        current.isDefault = true;
        return current;
      }).catch(function(err) {
        throw err;
      });
    },
    getEmployees: function() {
      var current = this;
      return User.findAll({
        where: {
          departmentId: current.id
        }
      }).then(function(results) {
        return results;
      }).catch(function(err) {
        throw err;
      });
    }
  }
});

module.exports = Department;