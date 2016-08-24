var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Department = require('../models/department');

router.param('id', function(req, res, next, val) {
  Department.findOne({
    where: {
      id: val
    }
  }).then(function(result) {
    if(result) {
      req.department = result;
      return result;
    } else {
      return res.sendStatus(404);
    }
  }).then(function(result) {
    return result.getEmployees();
  }).then(function(results) {
    req.department.employees = results;
    return next();
  }).catch(function(err) {
    throw err;
  });
});
router.param('employeeId', function(req, res, next, val) {
  User.findOne({
    where: {
      id: val
    }
  }).then(function(result) {
    if(result) {
      req.employee = result;
      return next();
    } else {
      return res.sendStatus(404);
    }
  }).catch(function(err) {
    throw err;
  });
});
router.use('/', function(req, res, next) {
  Department.getDefault().then(function(result) {
    req.default = result;
    return next();
  });
});
router.use('/departments', function(req, res, next) {
  Department.findAll().then(function(results) {
    req.departments = results;
    return next();
  });
});
router.put('/departments/:id', function(req, res, next) {
  req.department.setDefault().then(function(result) {
    return result.save();
  }).then(function(result) {
    return res.redirect('/departments/' + result.id);
  }).catch(function(err) {
    throw err;
  })
});
router.get('/departments/:id', function(req, res, next) {
  if(req.department.id === req.default.id) {
    return res.redirect('/departments');
  }
  res.render('departments', {currentpage: 'departments', title: req.department.name, departments: req.departments, thisDepartment: req.department, employees: req.department.employees});
});
router.get('/departments', function(req, res, next) {
  res.render('departments', {currentpage: 'departments', title: req.default.name, departments: req.departments, thisDepartment: req.default});
});
router.post('/departments/:id/employees', function(req, res, next) {
  User.create({
    name: req.body.name,
    departmentId: req.params.id
  }).then(function(result) {
    return res.redirect('/departments/' + req.params.id);
    // return res.json(result);
  }).catch(function(err) {
    throw err;
  });
});
router.put('/departments/:id/employees/:employeeId', function(req, res, next) {
  req.employee.departmentId = null;
  res.json(req.employee);
});
//@TODO: delete customer. If after deleting there are no results !results delete the department
router.delete('/departments/:id/employees/:employeeId', function(req, res, next) {
  User.delete({

  }).then(function(result) {
    res.redirect(resu)
  }).catch(function(err) {
    throw err;
  });
});
router.post('/departments', function(req, res, next) {
  Department.create({
    name: req.body.name
  }).then(function(result) {
    res.redirect('/departments/' + result.id);
  }).catch(function(err) {
    throw err;
  });
});
router.get('/', function(req, res, next) {
  res.render('index', {currentpage: 'home'});
});



module.exports = router;