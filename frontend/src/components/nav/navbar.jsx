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
        <div>
          {/* <Link to={"/tweets"}>All Tweets</Link> */}
          <Link to={"/profile"} className="nav-button">
            Profile
          </Link>
          {/* <Link to={"/new_tweet"}>Write a Tweet</Link> */}
          <span onClick={this.logoutUser} className="nav-button">
            Logout
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/signup"} className="nav-button">
            sign up
          </Link>
          <Link to={"/login"} className="nav-button">
            log in
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nav-bar">
        <h1 className="nav-title">
          <Link to={"/"} className="nav-button">
            <i className="fas fa-paper-plane"></i> invitely
          </Link>
        </h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
