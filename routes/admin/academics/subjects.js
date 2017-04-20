const express = require('express');
const router = express.Router();

const Subject = require('../../../models/subject');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Subject.find().lean().exec().then((subjects) => {
    subjects = subjects  || [];
    res.render('admin/academics/subjects.html.twig', {
      subjects: subjects
    });
  }).catch((err) => {
    next(err);
  });
});

router.post('/', function (req, res, next) {
  let subject = new Subject({
    name: req.body.name
  });
  subject.save().then(() => {
    req.flash('success', 'Subject added');
    res.redirect(req.originalUrl);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
