/** @jsx React.DOM */

$(function() {
  window.UsersList = React.createClass({
    render: function() {
      return (
        <div>
          <div className="header">
            <h3>Документ редактируют:</h3>
          </div>
          <div className="body">
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
