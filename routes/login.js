const express = require('express');
const router = express.Router();
const userlib = require('../lib/user');
const auth = require('../lib/auth');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login.html.twig');
});

router.post('/', (req, res) => {
  let username = req.body['username'];
  let password = req.body['password'];

  userlib.login(username, password).then((user) => {
    return auth.store(req, user);
  }).then(() => {
    res.redirect('/');
  }).catch((err) => {
    res.render('login.html.twig', {
      error: err
    });
  });
});

module.exports = router;
