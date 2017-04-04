const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login.html.twig');
});

router.post('/', function (req, res) {
  let username = req.body['username'];
  let password = req.body['username'];

  res.render('login.html.twig', {
    error: 'Username or password incorrect'
  });
});

module.exports = router;
