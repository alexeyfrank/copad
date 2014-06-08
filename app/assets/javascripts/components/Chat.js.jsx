/** @jsx React.DOM */


$(function() {
  window.Chat = React.createClass({
    render: function() {
      return (
        <div className="inner-container">
          <div className="header">
            <h4>Чат</h4>
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
          <div className="media" key={key}>
            <div className="media-body">
              <div className="media-heading">{val.user.email}</div>
              <div className="">{val.message}</div>
            </div>
          </div>
        );
      })
    },

    sendMessage: function() {
      window.socket.emit('newMessage', { user: gon.current_user, document: gon.current_document, message: this.refs.message.getDOMNode().value });
    }
  });

});
