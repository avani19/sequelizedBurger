// Import express
var express = require('express');
// router for the app
var router = express.Router();
// Import burger.js
// var burger = require('../models/burger.js');
var models = require('../models');
var sequelizeConnection = models.sequelize;

router.get('/', function (req, res){
  // res.redirect('/burgers');
    res.render('/index');
});

router.get('/index', function (req, res) {
  models.burgers.findAll({}).then(function(data){

    var hbsObject = { burgers: data };
   // console.log(data);
    res.render('index', hbsObject);

  })
});

router.post('/burgers/create', function (req, res) {
    // Sequelize Query to add new burger to database
  models.burgers.create(
    {
      burger_name: req.body.bname,
      devoured: false
    }
  ).then(function(data){
    // After the burger is added to the database, refresh the page
    res.redirect('/index');
  });

});
// To update burgers on parameter id 
router.post('/burgers/update/:id', function (req, res) {
   // we are using aquery to find the burger will a selected id.
  models.burgers.findOne({ where: {id: req.params.id} })
  .then(function(id) {

  // now update devoured to true
    id.update({
      devoured: true
    })
    // After the burger is updated to the database, refresh the page
    .then(function(){
     res.redirect('/index');
    })
  });

});
// export the router
module.exports = router;