exports = module.exports = function(logger) {
  var amqp = require('crane-amqp');
  
  var broker = new amqp.Broker();
  return broker;
}

exports['@implements'] = [
  //'http://i.bixbyjs.org/ms/Broker',
  'http://i.bixbyjs.org/ms/net/amqp/Broker'
];
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/Logger'
];
