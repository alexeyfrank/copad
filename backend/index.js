var connect = require('connect'),
    sharejs = require('share').server;

var server = connect(
      connect.logger(),
      connect.static(__dirname + '/public')
    );
var options = {db: {type: 'none'}, websocket: true }; // See docs for options. {type: 'redis'} to enable persistance.

sharejs.attach(server, options);

server.listen(8085, function() {
    console.log('Server running at http://127.0.0.1:8085/');
});
