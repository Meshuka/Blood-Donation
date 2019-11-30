var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('first', { title: 'Express' });
});

router.get('/search',async (req, res) =>{
    let query = userdetail.find()
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
  })

});
module.exports = router;
