var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var plugin = require('../app/msprotocolplugin');
var amqp = require('crane-amqp');


describe('msprotocolplugin', function() {
  
  it('should export constructor', function() {
    expect(plugin).to.be.an('object');
  });
  
  it('should be annotated', function() {
    expect(plugin['@implements']).to.equal('http://i.bixbyjs.org/ms/ProtocolPlugIn');
    expect(plugin['@protocol']).to.equal('amqp');
  });
  
  describe('PlugIn', function() {
    
    describe('.createConnection', function() {
      
      describe('with url as string', function() {
        function MockConnection() {
          this.connect = sinon.spy();
        }
        
        var plugin, ConnectionSpy;
        ConnectionSpy = sinon.spy(MockConnection);
        plugin = $require('../app/msprotocolplugin',
          { 'crane-amqp': { Connection: ConnectionSpy } });
        
        var connection = plugin.createConnection('amqp://user:pass@host:10000/vhost');
        
        it('should construct connection', function() {
          expect(ConnectionSpy).to.have.been.calledOnce;
          expect(ConnectionSpy).to.have.been.calledWithExactly({
            host: 'host',
            port: 10000,
            login: 'user',
            password: 'pass',
            vhost: 'vhost'
          });
        });
    
        it('should connect', function() {
          expect(connection.connect).to.have.been.calledOnce;
          expect(connection.connect).to.have.been.calledWithExactly(undefined);
        });
        
        /*
        describe('parsing location', function() {
          
          it('alphabetic topic name', function() {
            var loc = connection.location.parse('https://pubsub.googleapis.com/v1/projects/example/topics/hello');
            expect(loc).to.deep.equal({ topic: 'hello' });
          });
          
        }); // parsing location
        */
        
      });
      
    });
    
  });
  
});
