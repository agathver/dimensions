const express = require('express');
const router = express.Router();

const Department = require('../../../models/department');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Department.find().lean().exec().then((departments) => {
    departments = departments  || [];
    res.render('admin/academics/departments.html.twig', {
      departments: departments
    });
  }).catch((err) => {
    next(err);
  });
});

router.post('/', function (req, res, next) {
  let department = new Department({
    name: req.body.name
  });
  department.save().then(() => {
    req.flash('success', 'Department added');
    res.redirect(req.originalUrl);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
