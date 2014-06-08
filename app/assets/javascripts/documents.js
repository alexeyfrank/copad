var state = {
  users: [],
  chat: {},
  runs: {},

  addUser: function(user) {
    if (_.findIndex(this.users, { id: user.id }) == -1) {
      this.users.push(user);
    }
    renderApp(this);
  },

  removeUser: function(user) {
    this.users = _.without(this.users, {email: user.email});
    renderApp(this);
  }
}

$(function () {
  initChat();

  renderApp(state);
});


function renderApp(state) {
  React.renderComponent(window.DocumentEditor(state), document.getElementById('application'));
}

function initChat() {
  window.socket = io.connect('ws://localhost:8086/', { transports: ['websocket']});
  socket.on('getUserData', function (data) {
    socket.emit('connectUserToDocument', { document: gon.current_document, user: gon.current_user });
  });

  socket.on('userConnected', function(state) {
    renderApp(state.documents[gon.current_document.id]);
  });

  socket.on('userDisconnected', function(state) {
    renderApp(state.documents[gon.current_document.id]);
  });

  socket.on('stateChanged', function(state) {
    renderApp(state.documents[gon.current_document.id]);
  });
}















