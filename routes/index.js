var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('first', { title: 'Express' });
});

router.get('/search',function(req,res,next){
  res.redirect('search');
});
module.exports = router;
