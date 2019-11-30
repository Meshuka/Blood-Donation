var express = require('express');
var router = express.Router();
var userdetails=require('../models/userdetail');

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

<<<<<<< HEAD
router.get('/search',async (req, res) =>{
    let query = userdetails.find()
    if (req.query.bloodgroup != null && req.query.group != '') {
      query = query.regex('bloodgroup', new RegExp(req.query.bloodgroup, 'i'))
    }
    
    try {
      const bloodgroups = await query.exec()
      res.render('/search', {
        bloodgroups: bloodgroups,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  });
// =======
router.get('/login', function(req, res, next) {
  res.render('login');
});

// >>>>>>> 62caba88c01cb9d58c5b0e56d74b6880a34b824b
router.get('/events', function(req, res, next) {
  res.render('events');
});
router.get('/eventform', function(req, res, next) {
  res.render('eventform');
});

router.get('/notify',function(req,res,next){
  // sgMail.setApiKey('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');
      const msg = {
        to: 'rmeshuka@gmail.com',
        from: 'joshinasla18@gmail.com',
         subject: 'event',
        text: message,
        html: '<strong>EVENT ENCOUNTERED</strong>',
      }
});
module.exports = router;
