const express = require('express');
const router = express.Router();

const users = require('./users');
const academics = require('./academics');
const auth = require('../../lib/auth');

router.use(auth.authenticated);

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin/index.html.twig');
});

router.use('/users', users);
router.use('/academics', academics);

module.exports = router;
