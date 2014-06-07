/** @jsx React.DOM */

$(function() {
  window.UsersList = React.createClass({
    render: function() {
      return (
        <div>
          <div class="header">
            <h2>Документ редактируют:</h2>
          </div>
          <div class="body">
            <ul>
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
