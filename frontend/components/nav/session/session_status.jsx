var React = require("react");
var SessionLinks = require("./session_links");

var SessionStatus = React.createClass({
  loggedIn: function () {
    return (
      <div className="nav navbar-right">
        <SessionLinks user={ this.props.user }
          pushState={ this.props.pushState } />

        <button className="btn btn-default navbar-btn"
          onClick={ this.props.pushState.bind(null, "/logout") }>
          Logout
        </button>
      </div>
    );
  },

  loggedOut: function () {
    return (
      <div className="nav navbar-right">
        <button className="btn btn-default navbar-btn"
          onClick={ this.props.pushState.bind(null, "/signup") }>
          Sign Up
        </button>

        <span className="spacer spacer-small"></span>

        <button className="btn btn-default navbar-btn"
          onClick={ this.props.pushState.bind(null, "/login") }>
          Login
        </button>
      </div>
    );
  },

  render: function () {
    return (
      <div className="collapse navbar-collapse">
        { this.props.isLoggedIn ? this.loggedIn() : this.loggedOut() }
      </div>
    );
  }
});

module.exports = SessionStatus;
