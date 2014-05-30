$(function (){
  console.log(gon)
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/javascript");

  sharejs.open(gon.current_document.id, 'text', "ws://localhost:8085/sockjs", function(error, doc) {
    doc.attach_ace(editor);
  });


  setInterval(function() {
    var text = editor.getValue();

    $.ajax(Routes.api_v1_document_path(gon.current_document.id), {
      data: {
        document: { content: text }
      },
      method: 'put'
    }).then(function() {
      console.log('Document saved!');
    });
  }, 5000);
});
