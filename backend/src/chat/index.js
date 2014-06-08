var _ = require('lodash');
var rf = require('requestify');
var SocketIOServer = require('socket.io');

var Sockets = { };

function addUser(socket, id, msg, io, ServerModel) {
  if (!Sockets[id]) {
    Sockets[id] = 1;
    ServerModel.connectToDocument(msg.document, msg.user);
  } else {
    Sockets[id]++;
  }
  io.sockets.emit('stateChanged', ServerModel);
}

function removeUser(socket, id, userData, io, ServerModel) {
  Sockets[id]--;
  if (Sockets[id] == 0) {
    ServerModel.disconnectFromDocument(userData.document, userData.user);
    io.sockets.emit('stateChanged', ServerModel);
  }
}

module.exports = {
  attach: function(server, config, ServerModel) {
    var app = require('http').createServer(function() {});

    var io = SocketIOServer(app);

    ServerModel.addRunCodeHandler(function() {
      io.sockets.emit('stateChanged', ServerModel);
    })

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

      socket.on('runCode', function(msg) {
        console.log('runCode: ')
        console.log(msg)
        rf.post(config.damper_url, {
          code: msg.code,
          callback_url: config.callback_url + "&docId=" + msg.docId,
          lang: msg.lang,
          version: "2.0.1"
        }).then(function() {
          console.log('Run code request successfully sended!')
        }).fail(function() {
          console.log('Run code request got error!')
        })
      });


    });

    app.listen(8086);
  }
}
