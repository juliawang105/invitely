import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import PostsContainer from '../posts/posts_container';
import ReservationsContainer from '../reservations/reservations_container';
import TodosContainer from "../todos/todos_container";

import EventMap from "../posts/event_map";
// import { parse } from 'path';

const googleApiKey = process.env.googleApiKey;

class EventShow extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          showing: "home",
          scriptLoaded: false,
          scriptError: false,
          loaded: false
        };

      this.changePage = this.changePage.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
      this.props.fetchEventPosts(this.props.match.params.id)
        .then(() => this.setState({ loaded: true }));
      
      let navbar = document.querySelector(".nav-bar");
      
      if (navbar) {
        navbar.className += " orange";
      }

      this.props.getEvent(this.props.match.params.id);
      this.props.fetchEventReservations(this.props.match.params.id);
    }

    changePage(type) {
      this.setState({showing: type});
    }

    handleScriptCreate() {
      this.setState({ scriptLoaded: false });
    }
 
    handleScriptError() {
      this.setState({ scriptError: true })
    }
 
    handleScriptLoad() {
      this.setState({ scriptLoaded: true });
    }

    handleDelete() {
      let event = this.props.event.new;
      let reservations = this.props.reservations;
      if (reservations.length !== 0) {
        reservations.map(reservation => {
          this.props.destroyReservation(reservation._id);
        });
      }
      this.props.deleteEvent(event._id)
        .then(() => this.props.history.push("/"));
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
        } else if (this.state.showing === "todos") {
          body = <TodosContainer />;
        }


        let editLink;
        let todoList
        let cancelEvent;

        if (this.props.event.new.user === this.props.session.user.id) {
              editLink = (
                <div className="sidebar-nav-label">
                  <Link to={`/events/${this.props.event.new.id}/edit`}> Edit Event </Link>
                </div>
                );
              todoList = (
                <div className="sidebar-nav">
                  <div
                    onClick={() => this.changePage("todos")}
                    className="sidebar-nav-label"
                    value="todos"
                  >
                    To-do List
                </div>
              </div>
              )
              cancelEvent = (
                <div className="sidebar-nav">
                  <div
                    onClick={this.handleDelete}
                    className="sidebar-nav-label"
                    // value="todos"
                  >
                    Cancel Event
                </div>
              </div>
              )
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
        const parseEndTime = new Date(event.end_time).toISOString().replace(/-|:|\.\d\d\d/g, "");

        let date = new Date(event.time).toDateString();
        let time = new Date(event.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let end = new Date(event.end_time);
        let endTime =
          end.toDateString() +
          " " +
          end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
                    {todoList}
                    <div className="sidebar-nav">{editLink}</div>
                    {cancelEvent}
                  </div>
                </div>
              </div>

              <div className="event-page">
                <div className="event-main-show">
                  {eventImage}
                  <div className="event-info">
                    <div className="event-text">
                      <div className="event-name-item bold">{event.name}</div>

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
                          href={`https://calendar.google.com/calendar/r/eventedit?text=${parseString(event.name)}&dates=${parseTime}/${parseEndTime}&details=${parseString(event.body)}&location=${parseString(event.location)}&trp=true`}
                        >
                          <i className="far fa-clock event-icon"></i>
                          <span className="times">{date} {time} - 
                          <br/>
                          <i className="far fa-clock event-icon white"></i>{endTime}</span>
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