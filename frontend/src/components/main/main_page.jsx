import React from "react";
import "./main_page.css";
import { Link } from 'react-router-dom';
// import ScrollTrigger from "../../dist/ScrollTrigger.js";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // let trigger = new ScrollTrigger();
    // trigger.add("[data-trigger]");
  }

  render() {
    return (
      <div className="main-container">
        <div className="main-first-section main-section">
          <h1 className="main-title fade-in">
            <i className="fas fa-paper-plane"></i> invitely
          </h1>
          <div className="peek">
            <div className="down-arrow">
              <i className="fas fa-arrow-alt-circle-down"></i>
            </div>
          </div>
        </div>

        <div className="main-second-section main-section alt">
          <div className="section">
            <div className="text-box data-trigger">
              <h2 className="sub-header">Plan</h2>
              <p className="sub-text">
                Invitely is the place where you can organize all of your events conveniently
                in one place
              </p>
            </div>
            <div>
              {/* <img src="pic_001.jpeg" alt="2" className="main-image" /> */}
              {/* <img src="gif_004.gif" alt="2" className="main-image" /> */}
              <img src="gif_008.gif" alt="2" className="main-image" />
            </div>
          </div>
          <div className="peek alt">
            <div className="down-arrow">
              <i className="fas fa-arrow-alt-circle-down"></i>
            </div>
          </div>
        </div>

        <div className="main-third-section main-section">
          <div className="section">
            <div>
              <img src="gif_001.gif" alt="3" className="main-image" />
              {/* <img src="pic_005.jpg" alt="3" className="main-image" /> */}
            </div>
            <div className="text-box alt">
              <h2 className="sub-header">Invite</h2>
              <p className="sub-text">
                Instantly send out invitations by email and keep track of RSVPs
              </p>
            </div>
          </div>
          <div className="peek">
            <div className="down-arrow">
              <i className="fas fa-arrow-alt-circle-down"></i>
            </div>
          </div>
        </div>

        <div className="main-fourth-section main-section alt">
          <div className="section">
            <div className="text-box">
              <h2 className="sub-header white">Gather</h2>
              <p className="sub-text">
                Have your loved ones present during life's biggest moments
              </p>
            </div>
            <div>
              {/* <img src="pic_002.jpeg" alt="pic_02" className="main-image" /> */}
              <img src="gif_002.gif" alt="4" className="main-image" />
            </div>
          </div>
          <div className="peek alt">
            <div className="down-arrow">
              <i className="fas fa-arrow-alt-circle-down"></i>
            </div>
          </div>
        </div>

        <div className="main-fifth-section main-section final-section">
          <div className="text-box get-started">
            <h2 className="sub-header join-title white">Join</h2>
            <p className="sub-tagline">Your next event starts here</p>
            <div className="get-started-links">
              <div className="button-box">
                <Link to="/signup">
                  <h2>Sign Up</h2>
                </Link>
              </div>
              <div className="button-box">
                <Link to="/login">
                  <h2>Log In</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <footer className="main-footer">&copy; invitely</footer>
        </div>
      </div>
    );
  }
}

export default MainPage;
