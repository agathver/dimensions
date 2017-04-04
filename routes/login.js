const express = require('express');
const router = express.Router();
const userlib = require('../lib/user');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login.html.twig');
});

router.post('/', (req, res) => {
  let username = req.body['username'];
  let password = req.body['username'];

  userlib.login(username, password).then((user) => {
    // login successful
    res.redirect('/dashboard');
  }).catch((err) => {
    res.render('login.html.twig', {
      error: 'Username or password incorrect'
    });
  });
});

module.exports = router;