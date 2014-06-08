var url = require('url');
var handlers = require('./handlers');



module.exports = function(config, ServerModel) {
  return function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (handlers[query.action]) handlers[query.action](req, query, ServerModel, config);
    res.end();
  }
}
