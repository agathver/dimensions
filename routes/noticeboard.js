const express = require('express');
const router = express.Router();

const Notice = require('../models/notice');

/* GET home page. */
router.get('/', function (req, res, next) {
  Notice.find({})
    .sort('-createdAt')
    .lean()
    .exec()
    .then((notices) => {
      res.render('noticeboard.html.twig', {
        notices: notices
      });
    }).catch((err) => {
      next(err);
    });
});

router.post('/', function (req, res) {
  let notice = new Notice({
    title: req.body.title,
    content: req.body.content,
    link: req.body.link,
    createdBy: req.user._id
  });
  notice.save().then(() => {
    req.flash('success', 'Notice posted');
    res.redirect('/noticeboard');
  }).catch((err) => {
    req.flash('error', err);
    res.redirect('/noticeboard');
  });
});

module.exports = router;
