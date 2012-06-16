var Tilt = (function () {

  var https = require('https'),
      http = require('http'),
      fs = require('fs'),
      apiKey;

  var init = function init (key) {

    if ( key && typeof key === "String") {
      apikey = key;
    }

  };

  var getSales = function getSales () {
    var sales, data;

    var activeSales = {
      host: 'api.gilt.com',
      path: '/v1/sales/active.json?apikey=' + apiKey
    };

    var getActiveSales = function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        if (str.length) {
          console.log("Got Data from api.gilt\n");
          fs.writefile(__dirname + "/data/sales.json", str);
        }
      });
    };

    https.request(activeSales, getActiveSales).end();
  };

  return {
    init : init,
    getSales : getSales
  };
}());

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GiltCollector;
} else if (typeof exports !== 'undefined') {
  exports.HoganExpressAdapter = GiltCollector;
}