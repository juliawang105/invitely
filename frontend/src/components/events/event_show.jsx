import React from 'react';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Link } from "react-router-dom";
import PostsContainer from '../posts/posts_container';
import ReservationsContainer from '../reservations/reservations_container';

class EventShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showing: "home"
        };

      this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
      let navbar = document.querySelector(".nav-bar");
      if (navbar) {
        navbar.className += " orange";
      }

        this.props.getEvent(this.props.match.params.id);
    }

    changePage(type) {
      this.setState({showing: type});
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
                <div className="sidebar-nav-label">
                  <Link to={`/events/${this.props.event.new.id}/edit`}> Edit </Link>
                </div>
                );
            };

        return (
          <div className="event-show-box">
            <div className="nav-color"></div>

            <div className="event-show">










              <div className="sidebar-wrapper">
                <div className="sidebar">
                  <div className="sidebar-title">Navigation</div>
                  <div className="side-nav-links">
                    <div className="sidebar-nav">
                      <div
                        onClick={() => this.changePage("home")}
                        className="sidebar-nav-label"
                        value="home"
                      >
                        Info
                      </div>
                    </div>

                    <div className="sidebar-nav">
                      <div
                        onClick={() => this.changePage("guests")}
                        className="sidebar-nav-label"
                        value="guests"
                      >
                        Guests
                      </div>
                    </div>

                    <div className="sidebar-nav">{editLink}</div>

                  </div>
                </div>
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