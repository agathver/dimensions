const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

const library = require('./library');
const events = require('./events');
const noticeboard = require('./noticeboard');

router.use(auth.authenticated);

/* GET home page. */
router.get('/', auth.authenticated, function(req, res) {
  res.render('index.html.twig');
});

router.use('/library', library);
router.use('/events', events);
router.use('/noticeboard', noticeboard);


module.exports = router;
