var connect = require('connect'),
    sharejs = require('share').server,

    model = require('./data');
    damper = require('./damper'),
    chat = require('./chat');

module.exports = {
  run: function(config) {
    var server = connect(
          connect.logger(),
          connect.static(__dirname + '/public'),
          damper.server(config.damper, model)
        );

    sharejs.attach(server, config.sharejs);
    chat.attach(server, config.chat, model);

    server.listen(8085, function() {
        console.log('Server running at http://127.0.0.1:8085/');
    });

    return server;
  }
}
