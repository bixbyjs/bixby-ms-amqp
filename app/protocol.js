exports = module.exports = function() {
  return require('../lib/protocol');
}

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/ms/protocol';
exports['@name'] = 'amqp';
