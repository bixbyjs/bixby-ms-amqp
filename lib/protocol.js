var uri = require('url');
var amqp = require('crane-amqp');


exports.canHandle = function(options) {
  var url = uri.parse(options.url);
  if (url.protocol == 'amqp:') {
    return true;
  }
  return false;
  
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

exports.createConnection = function(options, readyListener) {
  var url = uri.parse(options.url)
    , opts = {}
    , conn, creds;
  
  opts.host = url.hostname;
  opts.port = url.port || 5672;
  if (url.pathname) {
    opts.vhost = url.pathname.split('/')[1];
  }
  if (url.auth) {
    creds = url.auth.split(':');
    opts.login = creds[0];
    opts.password = creds[1];
  }
  
  conn = new amqp.Connection();
  conn.connect(opts, readyListener);
  return conn;
};

exports.getName = function(options) {
  var url = uri.parse(options.url);
  return url.protocol + '//' +  url.host;
};

exports.getContext = function(options) {
  // TODO: get this from URL
  return { topic: 'foo' };
};
