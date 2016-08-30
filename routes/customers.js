var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.param('id', function(req, res, next, val) {
  User.findById(val)
    .then(function(employee){
      if(!employee)
        return next('could not be found');
      res.locals.user = employee;
      next();
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
  User.findAll({
    where: {
      departmentId: null
    }
  }).then(function(results) {
    res.render('customers', {currentpage: 'customers', customers: results})
  })
  .catch(next);
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
  req.locals.user.makeEmployee()
    .then(function(result) {
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
  })
  .catch(next);
});

module.exports = router;
