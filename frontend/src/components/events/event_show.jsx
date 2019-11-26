import React from 'react';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Link } from "react-router-dom";
import PostsContainer from '../posts/posts_container';
import ReservationsContainer from '../reservations/reservations_container';
import Script from 'react-load-script';

class EventShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showing: "home",
          scriptLoaded: false,
          scriptError: false
        };

      this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
      debugger
       console.log(process.env.REACT_APP_GOOGLE_API_KEY);
        console.log("HER");


      let navbar = document.querySelector(".nav-bar");
      if (navbar) {
        navbar.className += " orange";
      }

        this.props.getEvent(this.props.match.params.id);
    }

    changePage(type) {
      this.setState({showing: type});
    }

    handleScriptCreate() {
      this.setState({ scriptLoaded: false })
    }
 
    handleScriptError() {
      this.setState({ scriptError: true })
    }
 
    handleScriptLoad() {
      this.setState({ scriptLoaded: true })
    }

    render(){
       
        let event = this.props.event.new;
        if (!event){

            return null;
        }
        let body
        if (this.state.showing === "home") {
          body = <PostsContainer />
        } else if (this.state.showing === "guests") {
          body = <ReservationsContainer />
        }


        let editLink;

        if (this.props.event.new.user === this.props.session.user.id) {
              editLink = (
                <div className="sidebar-nav">
                  <Link to={`/events/${this.props.event.new.id}/edit`}> Edit </Link>
                </div>
                );
            };

        return (
          <div className="event-show-box">
          <Script
              url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
              onCreate={this.handleScriptCreate.bind(this)}
              onError={this.handleScriptError.bind(this)}
              onLoad={this.handleScriptLoad.bind(this)}
            />
            <div className="nav-color"></div>

            <div className="event-show">


              <div className="sidebar">
                <div>Navigation</div>
                <div 
                  onClick={() => this.changePage("home")}
                  className="sidebar-nav"
                  value="home">
                  Info
                </div>
                <div 
                  onClick={() => this.changePage("guests")}
                  className="sidebar-nav" 
                  value="guests">
                  Guests
                </div>
                {editLink}

              </div>
             
              <div className="event-page">
                <div className="event-info">
                  <div>{event.name}</div>
                  <div>{event.body}</div>
                  <div>Where: {event.location}</div>
                  <div>When: {event.time}</div>
                  <div>Hosted by: {event.host} </div>
                </div>

                {body}
              </div>
            </div>
          </div>
        );
    }

};

export default withRouter(EventShow);