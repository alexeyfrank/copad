var rf = require('requestify');

module.exports = {
  'damper_response': function(req, query, ServerModel) {
    console.log('get response from damper');

    console.log(query)
    ServerModel.addRunCodeResult(query['docId'], query);

    console.log(query['result'])
    console.log(query['file-content'])
    console.log(query['id'])
    console.log(query['callback_url'])
  }
}
