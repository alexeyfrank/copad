var state = {
  users: [],
  chat: {},
  runs: [],
}

$(function () {
  initChat();
  initCodeRunner();

  // renderApp(state);
});


function renderApp(state) {
  window.documentEditor = React.renderComponent(window.DocumentEditor(state), document.getElementById('application'));
}

function initCodeRunner() {
  $('#run-code-btn').click(function() {
    var code = window.documentEditor.getCode();
    var lang = gon.current_document.lang;
    var id = gon.current_document.id;

    console.log('run code')
    window.socket.emit('runCode', {
      code: code,
      lang: lang,
      docId: id,
      user: gon.current_user
    });

    return false;
  });
}

function initChat() {
  window.socket = io.connect('ws://localhost:8086/', { transports: ['websocket']});
  socket.on('getUserData', function (data) {
    socket.emit('connectUserToDocument', { document: gon.current_document, user: gon.current_user });
  });

  socket.on('stateChanged', function(state) {
    var documentState = state.documents[gon.current_document.id];
    console.log(documentState)
    renderApp(documentState);
  });
}















