var express = require('express'),
  Tumblr = require(__dirname + '/lib/tumblr.js');


var app = express.createServer(express.logger());

app.configure(function () {
  /*
      Since we're going to have such a variety of things, it doesn't make sense to
      enforce a layout. If you would like to use our very basic one, you may set
      layout : true when you define your route
  */
  app.set('view options', { layout: false});

  // allow routes to override static pages among other things
  app.use(app.router);

  // everything else in the public folder
  app.use(express.static(__dirname + '/public'));

  // views in the views folder
  //app.set('views', __dirname + '/views');
});


app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/showProductForm', function (request, response) {
  response.send("The Product Form!");
});

app.get('/oauth', function (request, response) {
  Tumblr.authUrl(function (url) {
    response.redirect(url);
  });
});


var port = process.env.PORT || 5000;

console.log(" // ");
console.log(" // ");
console.log(" //    EFFIt ! ");
console.log(" // ");
console.log(" // ");

app.listen(port, function() {
  console.log("EFFIt on " + port);
});