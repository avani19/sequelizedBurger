var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var routes = require('./controllers/burgers_controller.js');
var exphbs = require('express-handlebars');
var app = express();
var models = require('./models');
var sequelizeConnection = models.sequelize;
// We run this query so that we can drop our tables even though they have foreign keys
// sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// // make our tables
// // note: force:true drops the table if it already exists
// .then(function(){
//   return sequelizeConnection.sync({force:true})
// })
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use('/', routes);
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
