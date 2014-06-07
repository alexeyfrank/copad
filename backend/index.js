var app = require('./src');

var config = {
  sharejs: {
    db: {
      type: 'none'
    },
    websocket: true
  },

  chat: {
  },

  damper: {
    damper_url: 'http://192.168.30.131:3000/',
    callback_url: "http://192.168.30.44:8085/?action=damper_response"
  }
};

app.run(config);
