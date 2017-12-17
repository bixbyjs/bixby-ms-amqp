var uri = require('url');
var amqp = require('crane-amqp');


exports.canHandle = function(options) {
  var url = uri.parse(options.url);
  if (url.protocol !== 'amqp:') {
    return false;
  }
  
  // TODO: add port, vhost here
  var ctx = { name: 'amqp:' + url.host }
  ctx.topic = 'foo' // TODO: get this from URL
  
  ctx.options = {
    host: url.hostname,
    port: url.port || 5672
  }
  
  var comps = url.pathname.split('/');
  ctx.options.vhost = comps[1];
  
  if (url.auth) {
    var creds = url.auth.split(':');
    ctx.options.login = creds[0];
    ctx.options.password = creds[1];
  }
  
  return ctx;
};

exports.create = function(options) {
  return new amqp.Connection();
};
