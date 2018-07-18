var uri = require('url')
  //, pubsub = require('crane-gcp-pubsub')
  //, loc = require('../lib/location');


exports.createConnection = function(options, readyListener) {
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  /*
  var url = uri.parse(options.url);
  if (url.protocol !== 'https:' || url.hostname !== 'pubsub.googleapis.com') { return; }
  
  var paths = url.pathname.split('/')
    , projectId, conn;
  if (paths[1] !== 'v1' || paths[2] !== 'projects') { return; }
  
  projectId = paths[3];
  conn = new pubsub.Connection({ projectId: projectId });
  conn.location = loc;
  conn.connect(readyListener);
  return conn;
  */
};

exports.getName = function(options) {
 
  if (typeof options == 'string') {
    options = { url: options };
  }
  
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
