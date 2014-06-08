var SocketIOServer = require('socket.io');

var Sockets = { };

function addUser(socket, id, msg, io, ServerModel) {
  if (!Sockets[id]) {
    Sockets[id] = 1;
    ServerModel.connectToDocument(msg.document, msg.user);
  } else {
    Sockets[id]++;
  }
  io.sockets.emit('userConnected', ServerModel);
}

function removeUser(socket, id, userData, io, ServerModel) {
  Sockets[id]--;
  if (Sockets[id] == 0) {
    ServerModel.disconnectFromDocument(userData.document, userData.user);
    io.sockets.emit('userDisconnected', ServerModel);
  }
}

module.exports = {
  attach: function(server, config, ServerModel) {
    console.log(ServerModel)
    var app = require('http').createServer(function() {});

    var io = SocketIOServer(app);

    io.on('connection', function(socket) {

      var id = null;
      var userData = null;

      socket.emit('getUserData');

      socket.on('connectUserToDocument', function(msg) {
        id = msg.document.id + "__" + msg.user.id;
        userData = msg;
        addUser(socket, id, msg, io, ServerModel);
      });

      socket.on('disconnect', function() {
        removeUser(socket, id, userData, io, ServerModel);
      });

      socket.on('newMessage', function(msg) {
        ServerModel.postChatMessage(msg.document, msg.user, msg.message);
        io.sockets.emit('stateChanged', ServerModel);
      })
    });

    app.listen(8086);
  }
}
