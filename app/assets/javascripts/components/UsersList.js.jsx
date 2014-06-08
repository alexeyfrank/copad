/** @jsx React.DOM */

$(function() {
  window.UsersList = React.createClass({
    render: function() {
      return (
        <div className="inner-container">
          <div className="header">
            <h4>Пользователи</h4>
          </div>
          <div className="body">
            <ul className="users-list">
              {this.renderUsers()}
            </ul>
          </div>
        </div>
      );
    },

    renderUsers: function() {
      return _.map(this.props.users, function(val, key) {
        return <li key={val.email}>{val.email}</li>;
      });
    }
  });
})
