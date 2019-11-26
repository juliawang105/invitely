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
    let { loggedIn, session } = this.props;
    if (loggedIn) {
      let navbar = document.querySelector(".nav-bar");
      if (navbar) {
        navbar.className += " orange";
      }

      return (
        <div className="nav-links">
          <Link
            to={`/users/${session.user.id}`}
            className="nav-button"
          >
            My Events
          </Link>
          <Link to={`/events`} className="nav-button">
            Create Event
          </Link>
          <span className="italic">
            Welcome, {session.user.firstName} 
            {/* {session.user.lastName}!  */}
            {/* (Email: {session.user.email}) */}
          </span>

          <span onClick={this.logoutUser} className="nav-button logout-button">
            Log Out
          </span>
        </div>
      );
    } else {
      // let navbar = document.querySelector(".nav-bar.orange");
      // if (navbar) {
      //   navbar.classList.remove("orange");
      // }
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
    let { loggedIn, session } = this.props;
    let invitely;
    if (loggedIn) {
      invitely = (
        <Link to={`/users/${session.user.id}`} className="nav-button">
          <i className="fas fa-paper-plane"></i> invitely
        </Link>
      );
    } else {
      invitely = (
        <Link to={`/`} className="nav-button">
          <i className="fas fa-paper-plane"></i> invitely
        </Link>
      );
    }
    return (
      <div className="nav-bar">
        <h1 className="nav-title">
          {invitely}
        </h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
