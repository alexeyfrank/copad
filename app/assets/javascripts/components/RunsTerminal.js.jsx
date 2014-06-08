/** @jsx React.DOM */


$(function() {
  window.RunsTerminal = React.createClass({
    componentDidMount: function() {
      var terminal = $('#terminal').terminal(function(command, term) {}, {
        name: 'js_demo',
        height: 200,
        prompt: '~%> '
      });

      this.terminal = terminal;
      this.renderRuns();
    },

    componentWillUpdate: function() {
      this.renderRuns();
    },

    renderRuns: function() {
      this.terminal.clear();
      _.each(this.props.state.runs, function(run) {
        this.terminal.echo('Run code...');
        this.terminal.echo('Result:');
        this.terminal.echo(run.result);
      }, this);
    },

    render: function() {
      return <div id="terminal"></div>;
    }
  });
});
