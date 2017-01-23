/*eslint-env node*/

//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// added by MRT to include ejs support
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

/* ----------------------------------------------------------------------------------------- */
/* Forward to home page -------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.get('/', function(req, res){
  res.render('home');
});

/* ----------------------------------------------------------------------------------------- */
/* Sample GET ------------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------------------- */

app.get('/rolls/:dice', function(req, res){
  var dice = req.params.dice * 1;
  var rolls = [];
  for (var i=0; i<dice; i++) {
    var rnd = Math.floor(Math.random()*6)+1;
    rolls.push(rnd)
  }
  res.send({rolls: rolls});
});

/* ----------------------------------------------------------------------------------------- */
/* Sample POST ----------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.post('/random', function(req, res){
  var rnd = Math.floor(Math.random() * 11);
  res.send({random: rnd});
});
