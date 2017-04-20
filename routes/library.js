const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

/* GET home page. */
router.get('/', auth.authenticated, function(req, res) {
  res.render('dashboard.html.twig');
});

module.exports = router;
