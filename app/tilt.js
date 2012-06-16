var Tilt = (function () {

  var https = require('https'),
      http = require('http'),
      fs = require('fs');


  var loadSales = function loadSales (key) {
    var sales, data;

    var activeSales = {
      host: 'api.gilt.com',
      path: '/v1/sales/active.json?apikey=' + key
    };

    var loadActiveSales = function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        if (str.length) {
          console.log("Got Data from api.gilt\n");
          var filename = __dirname + "/../data/sales.json";
          fs.writeFile(filename, str);
        }
      });
    };

    https.request(activeSales, getActiveSales).end();
  };

  var getSales = function getSales (callback) {
    var sales,
      filename = __dirname + "/../data/sales.json";

    fs.readFile(filename, function (err, data) {
      sales = JSON.parse(data);
      callback(sales);
    });
  };

  // get sales here??

  return {
    loadSales : loadSales,
    getSales : getSales
  };
}());

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Tilt;
} else if (typeof exports !== 'undefined') {
  exports.HoganExpressAdapter = Tilt;
}