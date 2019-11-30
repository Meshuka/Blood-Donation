var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('first', { title: 'Express' });
});

router.get('/events', function(req, res, next) {
  res.render('events');
});
router.get('/eventform', function(req, res, next) {
  res.render('eventform');
});

module.exports = router;
