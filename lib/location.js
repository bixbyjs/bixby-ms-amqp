var uri = require('url');

exports.parse = function(l) {
  var url = uri.parse(l)
    , paths = url.pathname.split('/')
    , obj = {};

  //obj.topic = paths[5];
  //obj.topic = 'foo';
  return obj;
};
