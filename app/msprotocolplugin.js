var uri = require('url')
  , amqp = require('crane-amqp')
  , loc = require('../lib/location');


exports.createConnection = function(options, readyListener) {
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  var url = uri.parse(options.url);
  if (url.protocol !== 'amqp:') { return; }
  
  var paths = url.pathname.split('/')
    , opts = {}, creds, conn;
  
  opts.host = url.hostname;
  opts.port = parseInt(url.port || 5672);
  if (url.pathname) {
    opts.vhost = decodeURIComponent(paths[1]);
  }
  if (url.auth) {
    creds = url.auth.split(':');
    opts.login = creds[0];
    opts.password = creds[1];
  }
  
  
  conn = new amqp.Connection(opts);
  conn.location = loc;
  // TODO: Parse exchange from URL, don't default to fanout...
  conn.connect({ exchange: 'amq.fanout' }, readyListener);
  return conn;
};

exports.getName = function(options) {
 
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  return 'amqp'
  
  /*
  var url = uri.parse(options.url);
  if (url.protocol !== 'https:' || url.hostname !== 'pubsub.googleapis.com') { return; }
  
  var paths = url.pathname.split('/')
    , projectId;
  if (paths[1] !== 'v1' || paths[2] !== 'projects') { return; }
  
  projectId = paths[3];
  return 'https://pubsub.googleapis.com/v1/projects/' + projectId;
  */
}


exports['@implements'] = 'http://i.bixbyjs.org/ms/ProtocolPlugIn';
exports['@protocol'] = 'amqp';
