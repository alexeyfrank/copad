$(function (){
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/javascript");

  sharejs.open('hello', 'text', function(error, doc) {
    doc.attach_ace(editor);
  });
});
