const express = require('express');
const router = express.Router();
const users = require('../lib/user');
const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res) {

  res.render('account.html.twig');
});

router.post('/update_password', function (req, res, next) {
  users.login(req.user.userId, req.body.currentPassword)
    .then((user) => {
      if (!user) {
        req.flash('error', 'Incorrect password');
        return res.redirect('/account');
      } else if (req.body.password === req.body.confirmPassword) {
        users.changePassword(user, req.body.password).then(() => {
          req.flash('success', 'Password updated');
          return res.redirect('/account');
        }).catch((err) => {
          next(err);
        });
      } else {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/account');
      }
    }).catch((err) => {
      next(err);
    });
});

router.post('/update_contact_details', function (req, res, next) {
  User.find({
    userId: req.user.userId
  }).then((user) => {
    user.email = req.body.email
    user.phoneNumber = req.body.phoneNumbe
    return user.save();
  }).then(() => {
    req.flash('success', 'Contact information updated');
    res.redirect('/account');
  }).catch((err) => {
    req.flash('error', err);
    res.redirect('/account');
  })
});

module.exports = router;
