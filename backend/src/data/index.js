var moment = require('moment');

module.exports = {
  documents: {
    id: {
      users: {
        id: {}
      },

      chat: {
        
      },

      runs: {
        id: {}
      }
    }
  },


  connectToDocument: function(doc, user) {
    if (!this.documents[doc.id]) {
      this.documents[doc.id] = {
        users: {},
        chat: {},
        runs: {}
      }
    }

    this.documents[doc.id].users[user.id] = user;
  },

  disconnectFromDocument: function(doc, user) {
    console.log(this.documents[doc.id].users[user.id])
    delete this.documents[doc.id].users[user.id];
  },

  postChatMessage: function(doc, user, message) {
    var time = +moment();
    this.documents[doc.id].chat[time] = {
      user: user,
      message: message
    }
  },

  addRunCode: function(docId, user) {
    var time = +moment();
    this.documents[docId].runs[time] = {
      user: user
    }
  }
}

