var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('first', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/blog', function(req, res, next) {
  res.render('blog');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/events', function(req, res, next) {
  res.render('events');
});
router.get('/eventform', function(req, res, next) {
  res.render('eventform');
});

module.exports = router;
