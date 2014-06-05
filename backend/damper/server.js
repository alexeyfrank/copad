var http = require('http');
var qs = require('querystring');
var url = require('url');
var rf = require('requestify');


var Queries = {};

module.exports = function(req, res) {
  function handleDumperResponse(query) {
      console.log('get response from damper');

      console.log(query['result'])
      console.log(query['file-content'])
      console.log(query['id'])
      console.log(query['callback_url'])
  }


  function handleDumperRequest(query) {
    rf.post('http://192.168.30.131:3000/', {
      code: "puts 1",
      callback_url: "http://192.168.30.44:8085/?action=damper_response&docId=" + query.doc_id,
      lang: "ruby",
      version: "2.0.1"
    })
    .then(function(response) {
      console.log(response.getStatus())
      // response.getBody();
    }).fail(function() {
      // console.log(arguments)
    });
  }

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (query.action == 'damper_response') {
    handleDumperResponse(query)

  } else if (query.action == 'damper_request') {
    handleDumperRequest(query);
  }

  res.end();
}
