const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('dashboard.html.twig');
});

module.exports = router;
