/** @jsx React.DOM */

function initEditor(id) {
  var editor = ace.edit(id);
  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/javascript");

  return editor;
}

function initShareJs(editor) {
  sharejs.open("document_" + gon.current_document.id, 'text', "ws://localhost:8085/sockjs", function(error, doc) {
    doc.attach_ace(editor);
  });
}

function initAutosave(editor) {
  // setInterval(function() {
  //   saveDocument(editor.getValue());
  // }, 5000);
}

function saveDocument(text) {
    $.ajax(Routes.api_v1_document_path(gon.current_document.id), {
      data: {
        document: { content: text }
      },
      method: 'put'
    }).then(function() {
      console.log('Document saved!');
    });
}

$(function() {
  window.DocumentEditor = React.createClass({
    componentDidMount: function() {
      this.editor = initEditor('editor');

      initShareJs(editor);
      initAutosave(editor);

    },

    getCode: function() {
      return this.editor.getValue();
    },

    render: function() {
      return (
        <div className="app-container">
          <div className="top-row">
            <div id="editor" className="editor" />
            <div className="chat">
              <Chat state={this.props} />
            </div>
            <div className="users">
              <UsersList users={this.props.users} />
            </div>
          </div>

          <div className="bottom-row">
            <div className="runs">
              <RunsTerminal state={this.props} />
            </div>
          </div>
        </div>
      );

    }
  })
})
