
/**
 * Module dependencies.
 */

var connect = require('connect'),
    helpers = require('./helpers'),
    assert = require('assert'),
    http = require('http');

module.exports = {
    test: function(){
        var server = helpers.run([
            { filter: 'vhost', hosts: {
                'foo.com': connect.createServer([
                    { module: {
                        handle: function(req, res){
                            res.writeHead(200, {});
                            res.end('from foo');
                        }
                    }}
                ]),
                'bar.com': connect.createServer([
                    { module: {
                        handle: function(req, res){
                            res.writeHead(200, {});
                            res.end('from bar');
                        }
                    }}
                ]),
            }}
        ]);

        var req = server.request('GET', '/', { Host: 'foo.com' });
        req.buffer = true;
        req.addListener('response', function(res){
            res.addListener('end', function(){
                assert.equal('from foo', res.body);
            });
        });
        req.end();
        
        var req = server.request('GET', '/', { Host: 'bar.com' });
        req.buffer = true;
        req.addListener('response', function(res){
            res.addListener('end', function(){
                assert.equal('from bar', res.body);
            });
        });
        req.end();
    }
}