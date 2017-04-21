const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const upload = require('multer')();
const babyparse = require('babyparse');

const Student = require('../../../models/student');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Student.find().lean().exec().then((students) => {
    students = students || [];
    res.render('admin/users/students.html.twig', {
      students: students
    });
  }).catch((err) => {
    next(err);
  });
});

router.post('/', function (req, res) {
  bcrypt.hash('1234567890', 13)
    .then((hash) => {
      let student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.registrationNumber,
        registrationNumber: req.body.registrationNumber,
        password: hash,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        // department: req.body.department,
        // type: req.body.type,
        // groups: req.body.groups
      });
      return student.save();
    }).then(() => {
      req.flash('success', 'User saved successfully');
      res.redirect('/admin/users/students');
    }).catch((error) => {
      req.flash('error', error);
      res.redirect('/admin/users/students');
    });
});

router.post('/csv_upload', upload.single('csv'), function (req, res) {
  if (req.file) {
    let result = babyparse.parseFiles(req.file.path);
    if (result.errors.length) {
      req.flash('danger', 'Could not parse csv');
      return res.redirect('/admin/users/students');
    }
    // console.log(result.data);
  } else {
    req.flash('danger', 'Upload CSV');
    return res.redirect('/admin/users/students');
  }
});

module.exports = router;
