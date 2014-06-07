var rf = require('requestify');

module.exports = {
  'damper_request': function(query, ServerModel, config) {
    rf.post(config.damper_url, {
      code: "puts 1",
      callback_url: config.callback_url + "&docId=" + query.doc_id,
      lang: "ruby",
      version: "2.0.1"
    })
    .then(function(response) {
      console.log(response.getStatus())
    }).fail(function() {});
  },

  'damper_response': function(query, ServerModel) {
    console.log('get response from damper');

    console.log(query['result'])
    console.log(query['file-content'])
    console.log(query['id'])
    console.log(query['callback_url'])
  }
}
