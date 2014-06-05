var connect = require('connect'),
    sharejs = require('share').server,
    damper = require('./damper');

var server = connect(
      connect.logger(),
      connect.static(__dirname + '/public'),
      damper.server
    );

var options = {db: {type: 'none'}, websocket: true };

sharejs.attach(server, options);

server.listen(8085, function() {
    console.log('Server running at http://127.0.0.1:8085/');
});
