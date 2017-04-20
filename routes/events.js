const express = require('express');
const router = express.Router();

const Event = require('../models/event');

/* GET home page. */
router.get('/', function (req, res, next) {
  Promise.all(
    [
      Event.find({
        date: {
          $gt: new Date()
        }
      }).sort('-date -createdAt').lean().exec(),
      Event.find({
        date: {
          $lt: new Date()
        }
      }).sort('-date -createdAt').lean().exec(),
    ])
    .then((results) => {
      let upcomingEvents = results[0] || [];
      let pastEvents = results[1] || [];
      res.render('events.html.twig', {
        upcomingEvents: upcomingEvents,
        pastEvents: pastEvents
      });
    }).catch((err) => {
      next(err);
    });
});

router.post('/', function (req, res) {
  let event = new Event({
    name: req.body.name,
    place: req.body.place,
    date: new Date(req.body.date),
    link: req.body.link,
    description: req.body.description,
    createdBy: req.user._id
  });
  event.save().then(() => {
    req.flash('success', 'Event posted');
    res.redirect('/events');
  }).catch((err) => {
    req.flash('error', err);
  });
});

module.exports = router;
