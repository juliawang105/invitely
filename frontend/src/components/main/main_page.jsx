import React from "react";
import "./main_page.css"

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
  

    // element.scrollIntoView();
    // element.scrollIntoView(false);
    // element.scrollIntoView({ block: "end" });
    // element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  } 

  render() {
    return (
      <div className="main-container">
        <div className="main-first-section"> 
          <h1 className="main-title fadeIn">
            <i className="fas fa-paper-plane"></i> invitely
          </h1>
          {/* <img
            src="background_003.jpg"
            alt="background-image"
            className="main-background-image"
          /> */}
        </div>
        <div className="main-second-section" onClick={this.handleScroll}></div>
        <div id="main-third-section"></div>
        <div className="main-fourth-section"></div>
        <div className="main-fifth-section"></div>
        <footer className="main-footer">
          &copy; <i className="fas fa-paper-plane"></i> invitely
        </footer>
      </div>
    );
  }
}

export default MainPage;
