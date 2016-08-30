var db = require('../db');
var Sequelize = require('sequelize');
var Department = require('./department')

var User = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  classMethods: {
    getEmployees: function(departmentId) {
      return User.findAll({
        where: {
          id: departmentId
        }
      })
      .catch(function(err) {
        throw err;
      })
    }
  },
  instanceMethods: {
    makeEmployee: function() {
      var current = this;
      return Department.getDefault().then(function(result) {
        current.departmentId = result.id;
        return current;
      }).catch(function(err) {
        throw err;
      })
    }
  }
});

User.belongsTo(Department, {as:'department'});
Department.hasMany(User, { foreignKey: 'departmentId' });
module.exports = User;
