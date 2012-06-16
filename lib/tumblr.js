var
  util = require('util'),
  OAuth = require('oauth').OAuth,

  TiltTumbler = (function () {
    var oauth = function (callbackUrl) {
      return new OAuth("http://www.tumblr.com/oauth/request_token",
      "http://www.tumblr.com/oauth/access_token",
      "fBd6jxjh3ctsNiihmKDS1D08hLANpGCHEzlpHeuem6FujkAgQE",
      "cS4T8599vctaZIXWKatuefreokLT8LCDwHVUNyqdRwn9IGkH6J",
      "1.0",
      encodeURIComponent(callbackUrl),
      "HMAC-SHA1");
    },

    echo = function (message) {
      return message;
    },

    authUrl = function(callback) {
      var oa = new oauth("http://localhost:5000/showProductForm");

      oa.getOAuthRequestToken(
      {
        oauth_callback : "http://localhost:5000/showProductForm"
      }, function(error, oauth_token, oauth_token_secret, results){
        var authUrlPrefix = "http://www.tumblr.com/oauth/authorize?oauth_token=";

        if (error) {
          util.puts('error :' + error.statusCode)
          util.puts('error :' + error.data)
        } else {
          callback(authUrlPrefix + oauth_token);
        }
      })
    }

    return {
      echo : echo,
      authUrl : authUrl
    };

  }());

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TiltTumbler;
} else if (typeof exports !== 'undefined') {
  exports.TiltTumbler = TiltTumbler;
}