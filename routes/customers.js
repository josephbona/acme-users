var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Department = require('../models/department');

router.param('id', function(req, res, next, val) {
  User.findOne({
    where: {
      id: val
    }
  }).then(function(result) {
    if(result) {
      req.user = result;
      return next();
    } else {
      return res.sendStatus(404);
    }
  }).catch(function(err) {
    throw err;
  });
});
router.get('/', function(req, res, next) {
  User.findAll({
    where: {
      departmentId: null
    }
  }).then(function(results) {
    res.render('customers', {currentpage: 'customers', customers: results})
  }).catch(function(err) {
    throw err;
  });
});
router.post('/', function(req, res, next) {
  User.create({
    name: req.body.name,
    customerId: null
  }).then(function(result) {
    // return res.json(result);
    return res.redirect('/customers');
  }).catch(function(err) {
    throw err;
  });
});
router.put('/:id', function(req, res, next) {
  req.user.makeEmployee().then(function(result) {
    return result.save();
  }).then(function(result) {
    // return res.json(result);
    return res.redirect('/departments');
  }).catch(function(err) {
    throw err;
  })
});
//@TODO: delete customer
router.delete('/:id', function(req, res, next) {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    return res.redirect('/customers');
  }).catch(function(err) {
    throw err;
  });
});

module.exports = router;