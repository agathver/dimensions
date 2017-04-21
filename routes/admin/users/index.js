const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const utils = require('../../../lib/utils');
const students = require('./students');
const faculty = require('./faculty');

const User = require('../../../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find().lean().exec().then((users) => {
    users = users || [];
    res.render('admin/users.html.twig', {
      users: users
    });
  }).catch((err) => {
    next(err);
  });
});

router.post('/', function (req, res) {
  bcrypt.hash('1234567890', 13)
    .then((hash) => {
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: utils.slugify(req.body.firstName + req.body.lastName),
        password: hash,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        type: req.body.type,
        groups: req.body.groups
      });
      return user.save();
    }).then(() => {
      req.flash('success', 'User saved successfully');
      res.redirect('/admin/users');
    }).catch((error) => {
      req.flash('error', error);
    });
});

router.use('/students', students);
router.use('/faculty', faculty);

module.exports = router;
