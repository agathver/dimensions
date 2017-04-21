const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

const library = require('./library');
const events = require('./events');
const noticeboard = require('./noticeboard');
const academics = require('./academics');

const Notice = require('../models/notice');
const Event = require('../models/event');
// const Library = require('../models/notice');
router.use(auth.authenticated);

/* GET home page. */
router.get('/', auth.authenticated, function(req, res, next) {
  Promise.all(
    [
      Event.find({
        date: {
          $gt: new Date(),
          $lt: new Date() + 7
        }
      }).limit(3).sort('date -createdAt').lean().exec(),
      Notice.find({}).sort('-createdAt').limit(10).lean().exec(),
    ])
    .then((results) => {
      let upcomingEvents = results[0] || [];
      let notices = results[1] || [];
      res.render('index.html.twig', {
        upcomingEvents: upcomingEvents,
        notices1: notices.slice(0,2),
        notices2: notices.slice(2)
      });
    }).catch((err) => {
      next(err);
    });
});

router.use('/library', library);
router.use('/events', events);
router.use('/noticeboard', noticeboard);
router.use('/academics', academics);

module.exports = router;
