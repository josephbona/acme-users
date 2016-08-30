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
        if(result)
          return result;
        return Department.create({
          name: 'Human Resources',
          isDefault: true
        });
      }).catch(function(err) {
        throw err;//good.. 
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
      return User.findAll({
        where: {
          departmentId: this.id
        }
      })
      .catch(function(err) {
        throw err;
      });
    }
  }
});

module.exports = Department;
