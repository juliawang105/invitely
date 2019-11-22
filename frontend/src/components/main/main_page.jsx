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
            <div className="down-arrow hvr-hang">
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
        </div>

        <div className="main-second-section main-section alt">
          <div className="section">
            <div className="text-box data-trigger">
              <h2 className="sub-header">Plan</h2>
              <p className="sub-text">
                Invitely is the place where you can organize all of your events
                conveniently in one place
              </p>
            </div>
            <div>
              <img src="pic_001.jpeg" alt="2" className="main-image" />
              {/* <img src="gif_004.gif" alt="2" className="main-image" /> */}
              {/* <img src="gif_008.gif" alt="2" className="main-image" /> */}
            </div>
          </div>
          <div className="peek alt">
            <div className="down-arrow hvr-hang">
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
        </div>

        <div className="main-third-section main-section">
          <div className="section">
            <div>
              {/* <img src="pic_005.jpg" alt="3" className="main-image" /> */}
              <img src="gif_001.gif" alt="3" className="main-image" />
            </div>
            <div className="text-box alt">
              <h2 className="sub-header">Invite</h2>
              <p className="sub-text">
                Instantly send out invitations by email and keep track of RSVPs
              </p>
            </div>
          </div>
          <div className="peek">
            <div className="down-arrow hvr-hang">
              <i className="fas fa-sort-down"></i>
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
              <img src="pic_002.jpeg" alt="pic_02" className="main-image" />
              {/* <img src="gif_002.gif" alt="4" className="main-image" /> */}
            </div>
          </div>
          <div className="peek alt">
            <div className="down-arrow hvr-hang">
              {/* <i className="fas fa-sort-down"></i>

 */}
              Get Started Below
              {/* <i className="fas fa-sort-down"></i>

 */}
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
          <div className="peek alt">
            <div className="down-arrow hvr-hang">Contact Us</div>
          </div>
        </div>

        <div className="main-about-section main-section final-section">
          <h2 className="sub-header">Developers</h2>
          <br />
          <br />
          <div className="section">
            <div className="dev-box">
              <a href="https://www.linkedin.com/in/isom-durm/">
                <img
                  src="dev-isom-durm.jpg"
                  alt="Isom Durm"
                  className="dev-image"
                />
              </a>
              <p className="sub-tagline">
                <a href="https://www.linkedin.com/in/isom-durm/">Isom Durm</a>
                <div className="dev-links">
                  <a href="https://github.com/isomdurm">
                    <i class="fab fa-github-alt"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/isom-durm/">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </p>
            </div>
            <div className="dev-box">
              <a href="https://www.linkedin.com/in/julia-wang-b1981231/">
                <img
                  src="dev-julia-wang.jpg"
                  alt="Jula Wang"
                  className="dev-image"
                />
              </a>
              <p className="sub-tagline">
                <a href="https://www.linkedin.com/in/julia-wang-b1981231/">
                  Julia Wang
                </a>
                <div className="dev-links">
                  <a href="https://github.com/juliawang105">
                    <i class="fab fa-github-alt"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/julia-wang-b1981231/">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </p>
            </div>
            <div className="dev-box">
              <a href="https://www.linkedin.com/in/fion-pang-429172154/">
                <img
                  src="dev-fion-pang.jpg"
                  alt="Fion Pang"
                  className="dev-image"
                />
              </a>
              <p className="sub-tagline">
                <a href="https://www.linkedin.com/in/fion-pang-429172154/">
                  Fion Pang
                </a>
                <div className="dev-links">
                  <a href="https://github.com/fion-p">
                    <i class="fab fa-github-alt"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/fion-pang-429172154/">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </p>
            </div>
            <div className="dev-box">
              <a href="https://www.linkedin.com/in/dannaxu/">
                <img
                  src="dev-danna-xu.jpg"
                  alt="Danna Xu"
                  className="dev-image"
                />
              </a>
              <p className="sub-tagline">
                <a href="https://www.linkedin.com/in/dannaxu/">Danna Xu</a>
                <div className="dev-links">
                  <a href="https://github.com/danna-aa">
                    <i class="fab fa-github-alt"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/dannaxu/">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </p>
            </div>
          </div>

          <h2 className="sub-header">
            <a href="https://github.com/juliawang105/invitely">
              <i className="fas fa-paper-plane"></i> Invitely{" "}
              {/* <i class="fab fa-github-alt"></i> */}
            </a>
          </h2>
        </div>
        <div>
          <footer className="main-footer">&copy; invitely</footer>
        </div>
      </div>
    );
  }
}

export default MainPage;
