var app = require('./src');

var config = {
  sharejs: {
    db: {
      type: 'none'
    },
    websocket: true
  },

  chat: {
    damper_url: 'http://172.25.197.209:3000/',
    callback_url: "http://172.25.197.56:8085/?action=damper_response"
  },

  damper: {
    damper_url: 'http://172.25.197.209:3000/',
    callback_url: "http://172.25.197.56:8085/?action=damper_response"
  }
};

app.run(config);
