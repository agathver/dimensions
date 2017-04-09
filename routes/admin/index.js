const express = require('express');
const router = express.Router();

const users = require('./users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin/index');
});

router.use('/user', users);

module.exports = router;
