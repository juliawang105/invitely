

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Switch, Route, Link } from "react-router-dom";
import PostsContainer from '../posts/posts_container';
import ReservationsContainer from '../reservations/reservations_container';
import EventMap from "../posts/event_map";
import { parse } from 'path';

class EventShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showing: "home",
          loaded: false
        };

      this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
      // debugger
      this.props.fetchEventPosts(this.props.match.params.id)
        .then(() => this.setState({ loaded: true }));
      
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
        let posts = this.props.posts;
        if (!event){
            return null;
        }

        let body
        if (this.state.showing === "home" && this.state.loaded) {
          body = <PostsContainer />;
        } else if (this.state.showing === "guests") {
          body = <ReservationsContainer />;
        }


        let editLink;

        if (this.props.event.new.user === this.props.session.user.id) {
              editLink = (
                <div className="sidebar-nav-label">
                  <Link to={`/events/${this.props.event.new.id}/edit`}> Edit Event </Link>
                </div>
                );
            };

        let hosted;
        if (event.host) {
          hosted = (
            <div className="event-info-item">Hosted by: {event.host}</div>
          );
        } 

        let eventImage;
        if (event.image_url) {
          eventImage = (
            <div className="event-image-item">
              <div className="event-image-box">
                <img src={event.image_url} alt="event-image" className="event-image"/>
              </div>
            </div>
          );
        }




        const parseString = (string) => {
          return string.split(" ").join("+");
        }



        const parseTime = new Date(event.time).toISOString().replace(/-|:|\.\d\d\d/g, "");

        let date = new Date(event.time).toDateString();
        let time = new Date(event.time).toLocaleTimeString();

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
                        Discussion
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
                <div className="event-main-show">
                  {eventImage}
                  <div className="event-info">
                    <div className="event-text">
                      <div className="event-name-item">{event.name}</div>

                      <div className="event-info-item">
                        <a
                          href={`https://www.google.com/maps/dir//${parseString(
                            event.location
                          )}`}
                        >
                          <i className="fas fa-map-marker-alt event-icon"></i>{" "}
                          {event.location}
                        </a>
                      </div>
                      <div className="event-info-item">
                        <a
                          href={`https://calendar.google.com/calendar/r/eventedit?text=${parseString(event.name)}&dates=${parseTime}/${parseTime}&details=${parseString(event.body)}&location=${parseString(event.location)}&trp=true`}
                        >
                          <i className="far fa-clock event-icon"></i>
                          {date} {time}
                        </a>
                      </div>

                      <div className="event-info-item event-body">
                        {event.body}
                      </div>
                      <div className="event-info-item hosted">{hosted}</div>
                    </div>

                    <div className="map-box">
                      <EventMap event={event} className="map" />
                      <div className="event-info-item">
                        <a
                          href={`https://www.google.com/maps/dir//${parseString(
                            event.location
                          )}`}
                        >
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="event-more">{body}</div>
              </div>
            </div>
          </div>
        );
    }

};

export default withRouter(EventShow);