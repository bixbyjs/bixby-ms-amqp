var uri = require('url');
var amqp = require('crane-amqp');


exports.canHandle = function(options) {
  var url = uri.parse(options.url);
  if (url.protocol == 'amqp:') {
    return true;
  }
  return false;
};

exports.createConnection = function(options, readyListener) {
  var url = uri.parse(options.url)
  var comps = url.pathname.split('/')
    , opts = {}
    , conn, creds;
  
  opts.host = url.hostname;
  opts.port = url.port || 5672;
  if (url.pathname) {
    opts.vhost = comps[1];
  }
  if (url.auth) {
    creds = url.auth.split(':');
    opts.login = creds[0];
    opts.password = creds[1];
  }
  
  // extended version of https://www.rabbitmq.com/uri-spec.html
  
  opts.exchange = comps[2];
  
  conn = new amqp.Connection();
  conn.connect(opts, readyListener);
  return conn;
};

exports.getName = function(options) {
  // TODO: put the exchange and vhost in here
  
  var url = uri.parse(options.url);
  return url.protocol + '//' +  url.host;
};

exports.parseTopic = function(url) {
  var url = uri.parse(url)
  var comps = url.pathname.split('/')
    , topic;
  
  topic = comps[3];
  return topic;
};
