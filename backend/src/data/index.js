var moment = require('moment');

module.exports = {
  documents: {
  },


  addRunCodeHandler: function(handler) {
    this._runCodeHandler = handler;
  },

  connectToDocument: function(doc, user) {
    if (!this.documents[doc.id]) {
      this.documents[doc.id] = {
        users: {},
        chat: {},
        runs: []
      }
    }

    this.documents[doc.id].users[user.id] = user;
  },


  disconnectFromDocument: function(doc, user) {
    delete this.documents[doc.id].users[user.id];
  },

  postChatMessage: function(doc, user, message) {
    var time = +moment();
    this.documents[doc.id].chat[time] = {
      user: user,
      message: message
    }
  },

  addRunCodeResult: function(docId, result) {
    this.documents[docId].runs.push(result);
    this._runCodeHandler();
  },
}

