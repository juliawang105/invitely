import React from "react";
import "./main_page.css"

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-container">
        <img src="background_004.jpg" alt="background-image" className="main-background-image"/>
        <div className="main-second-section"></div>
        <footer className="main-footer">
          Copyright &copy; 2019 <i className="fas fa-paper-plane"></i> invitely
        </footer>
      </div>
    );
  }
}

export default MainPage;
