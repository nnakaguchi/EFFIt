var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
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