
var express = require('express');
var router = express.Router();
var userdetails= require('../models/userdetails');
const bcrypt= require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated} = require('../config/auth');


//var multer=require('multer');
const path= require('path');
// var storage=multer.diskStorage({
// destination: './public/uploads/',
// filename: function(req,file,cb){
//   cb(null,file.fieldname+'_'+ Date.now()+path.extname(file.originalname));
// }
// });


// var upload =multer({
//   storage: storage
  
// }).single('image') ;


//  router.get('/index', function(req, res, next) {
//   productdetails.find().exec(function(err,productdetails){
//     console.log('....data',productdetails)
//    res.render('index',{productdetails})
//   })
// });   

// router.get('/adddetails',ensureAuthenticated, function(req, res, next){
//   res.render('adddetails', {
//     name: req.user.name
//   }
// )});


// router.post('/adddetails',upload, function(req, res, next) {
//   console.log(req.file)
//   var productdetail = new productdetails({
//   name: req.body.name,
//   price: req.body.price,
//   size: req.body.size,
//   condition: req.body.condition,
//   description: req.body.description,
//   image: req.file.filename,
  
// })

// var promise = productdetail.save()
// promise.then((productdetails) => {
//   console.log('product saved',productdetails)
//   res.render('editdelete', {productdetails});
// }).catch((error)=>{
//    console.log(error);
// })
// });





router.get('/login', function(req, res, next) {
   res.render('login')
  })
  

  router.get('/register', function(req, res, next) {
    res.render('register')
   })
   router.post('/register', (req, res) => {
    const { name, email,phone,location,bloodgroup, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
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
        name,
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
            name,
            email,
            password,
            password2
          });
        } else {

          const newUser = new userdetails({
            name,
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
    successRedirect: '/adddetails',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});
 
router.get('/checkout', function(req, res, next){
  res.render('checkout')
});


module.exports = router;
