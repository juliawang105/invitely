import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav-links">
          {/* <Link to={"/tweets"}>All Tweets</Link> */}

          
          <Link to={`/users/${this.props.session.user.id}`} className="nav-button">
            Welcome, {this.props.session.user.firstName}! My Events
          </Link>
          <Link to={`/events`} className="nav-button">
            Create New Event
          </Link>
          {/* <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <span onClick={this.logoutUser} className="nav-button">
            Log Out
          </span>
        </div>
      );
    } else {
      return (
        <div className="nav-links">
          <Link to={"/signup"} className="nav-button">
            Sign Up
          </Link>
          <Link to={"/login"} className="nav-button">
            Log In
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nav-bar">
        <h1 className="nav-title">
          <Link
            to={`/`}
            className="nav-button"
          >
            <i className="fas fa-paper-plane"></i> invitely
          </Link>
        </h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
