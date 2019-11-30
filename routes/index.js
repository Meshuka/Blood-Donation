
var express = require('express');
var router = express.Router();
var userdetails= require('../models/userdetails');
const bcrypt= require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated} = require('../config/auth');
const path= require('path');
const sgMail = require('@sendgrid/mail');


router.get('/home', function(req, res, next) {
  res.render('first')
 })


 router.get('/login', function(req, res, next) {
  res.render('login')
 })
 

 router.get('/register', function(req, res, next) {
   res.render('register')
  })
  router.post('/register', (req, res) => {
   const { bloodgroup, email, password, password2 } = req.body;
   let errors = [];
 
   if (!bloodgroup || !email || !password || !password2) {
     errors.push({ msg: 'Please enter all fields' });
   }
 
   if (password != password2) {
     errors.push({ msg: 'Passwords do not match' });
   }
 
   if (password.length < 4) {
     errors.push({ msg: 'Password must be at least 4 characters' });
   }
 
   if (errors.length > 0) {
     res.render('register', {
       errors,
       bloodgroup,
       email,
       password,
       password2
     });
   } else {
     userdetails.findOne({email: email})
     .then(user => {
       if(user) {
         errors.push({ msg: "Email is already registered"})
         res.render('register', {
           errors,
           bloodgroup,
           email,
           password,
           password2
         });
       } else {

         const newUser = new userdetails({
           bloodgroup,
           email,
           password
         });


 bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(newUser.password, salt, (err, hash) => {
     if (err) throw err;
     newUser.password = hash;
     newUser
       .save()
       .then(user => {
         req.flash(
           'success_msg',
           'You are now registered and can log in'
         );
         res.redirect('/login');
       })
       .catch(err => console.log(err));
   });
 });
}
});
}
});
        
        

router.post('/login', (req, res, next) => {
 passport.authenticate('local', {
   successRedirect: '/home',
   failureRedirect: '/login',
   failureFlash: true
 })(req, res, next);
});

router.get('/checkout', function(req, res, next){
 res.render('checkout')
});
// router.post('/rentdetails',upload, function(req, res, next) {
//   console.log(req.file)
//   var rentdetail = new rentdetails({
//   name: req.body.name,
//   price: req.body.price,
//   condition: req.body.condition,
//   description: req.body.description,
//   image: req.file.filename,
 
// })

// var promise = rentdetail.save()
// promise.then((rentdetails) => {
//   console.log('product saved',rentdetails)
//   res.render('save', {rentdetails});
// }).catch((error)=>{
//    console.log(error);
// })
// });


 //  router.get('/add-to-cart/:id', function(req, res, next){
 //    var productId = req.params.id;
 //  var cart = new Cart(req.session.cart ? req.session.cart : {});

 //    productdetails.findById(productId, function(err, productdetails) {
 //      if (err){
 //        return res.redirect('/index');
 //      }
 //     cart.add(productdetails, productdetails.id);
 //     req.session.cart = cart;
 //     console.log(req.session.cart);
 //     res.redirect('/index');
 //    });
 //  });

 
 





/* GET home page. */
router.get('/request', function (req, res, next) {
  res.render('request');
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
router.get('/events', function(req, res, next) {
  res.render('events');
});
router.get('/eventform', function(req, res, next) {
  res.render('eventform');
});
router.post('/eventmade', function(req, res, next) {
  res.render('events');
});
router.get('/sendmail',function(req,res,next){
  sgMail.setApiKey('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');
      const msg = {
        to: 'rmeshuka@gmail.com',
        from: 'joshinasla18@gmail.com',
         subject: 'event',
        text: 'message',
        html: '<strong>EVENT ENCOUNTERED</strong>',
      };
      console.log('message sent');
      sgMail.send(msg);
      });
module.exports = router;
