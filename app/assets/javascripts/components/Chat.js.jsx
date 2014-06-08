/** @jsx React.DOM */


$(function() {
  window.Chat = React.createClass({
    render: function() {
      return (
        <div>
          <div className="header">
            <h3>Чат:</h3>
          </div>
          <div className="body">
            <div className="messages">
              {this.renderMessages()}
            </div>

            <div className="form">
              <input ref="message" type="text" />
              <a className="btn" onClick={this.sendMessage.bind(this)}>Отправить</a>
            </div>
          </div>
        </div>
      );
    },

    renderMessages: function() {
      return _.map(this.props.state.chat, function(val, key) {
        return (
          <div className="message" key={key}>
            <div className="message-header">{val.user.email}</div>
            <div className="message-body">{val.message}</div>
          </div>
        );
      })
    },

    sendMessage: function() {
      window.socket.emit('newMessage', { user: gon.current_user, document: gon.current_document, message: this.refs.message.getDOMNode().value });
    }
  });

});
