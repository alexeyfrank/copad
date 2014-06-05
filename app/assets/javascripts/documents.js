$(function (){
  var editor = initEditor('editor');

  initShareJs(editor);
  initAutosave(editor);
});


function initEditor(id) {
  var editor = ace.edit(id);
  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/javascript");

  return editor;
}

function initShareJs(editor) {
  sharejs.open("document_" + gon.current_document.id, 'text', "ws://localhost:8085/sockjs", function(error, doc) {
    doc.attach_ace(editor);
    console.log(doc)
  });
}

function initAutosave(editor) {
  setInterval(function() {
    saveDocument(editor.getValue());
  }, 5000);
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
