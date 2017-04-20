const express = require('express');
const router = express.Router();

const Event = require('../models/event');

/* GET home page. */
router.get('/', function(req, res) {
  Event.find({

  }).sort('-createdAt').exec().then(() => {
    res.render('events.html.twig');
  });
});

router.post('/', function(req, res) {
  res.redirect('/events');
});

module.exports = router;
