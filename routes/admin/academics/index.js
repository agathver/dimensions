const express = require('express');
const router = express.Router();

const departments = require('./departments');
const semesters = require('./semesters');
const subjects = require('./subjects');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin/academics/index.html.twig');
});

router.post('/', function (req, res) {
  console.log(req.body); // eslint-disable-line
  res.render('admin/academics/index.html.twig');
});

router.use('/subjects', subjects);
router.use('/departments', departments);
router.use('/semesters', semesters);
module.exports = router;

