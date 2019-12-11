import React from "react";
import { Link } from 'react-router-dom';
import "./user_show.css";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      hosted: [],
      invited: [],
      sorted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

   componentDidMount() {
      let navbar = document.querySelector(".nav-bar");
      if (navbar) {
        navbar.className += " orange";
      }
    this.props.fetchUserEvents(this.props.user.id)
      .then(() => {
      this.props
        .fetchUserReservations(this.props.user.email)
        .then(res => {
          let reservations = res.reservations.data;

          if (reservations.length < 1) {
            this.setState({ loaded: true });            
          }

          for (let i = 0; i < reservations.length; i++) {
            this.props.getEvent(reservations[i].event)
            .then(() => {
              this.setState({ loaded: true });
            });
            }
          });
      })
  }


  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    
    let user = this.props.user;
    // let hostedEvents = this.state.hosted;
    let hostedEvents = this.props.events.all.sort(function(a, b) {
      return (new Date(a.time) - new Date(b.time));
    });
    // let inviteEvents = this.state.invited;
    let inviteEvents = this.props.events.user.sort(function(a, b) {
      return (new Date(a.time) - new Date(b.time));
    });

    let noEventMessage
    if (hostedEvents.length === 0) {
      noEventMessage = 
        <div className="user-event invited-event">
          No Events Yet!
        </div>
    }
    let noneInvitedMessage
    if (inviteEvents.length === 0) {
      noneInvitedMessage = 
        <div className="user-event invited-event">
          No Invites Yet!
        </div>
    }

    return (
      <div className="user-show">
        <div className="user-background"></div>
        <div className="user-show-box">
          <div className="invite-host">
            <h1>My Invitations</h1>
            {noneInvitedMessage}
            {inviteEvents.map(event => {
              let image;
              if (!event.image_url) {
                image = (
                  <img
                    src="gif_011.gif"
                    className="user-show-event-image"
                    alt="dinner_placeholder"
                  />
                );
              } else {
                image = (
                  <img
                    height="auto"
                    src={`${event.image_url}`}
                    className="user-show-event-image"
                  />
                );
              }
              return (
                <div className="user-event invited-event" key={event._id}>
                  <Link to={`/events/${event._id}`}>
                    <div className="user-event-details">
                      <div className="grid-container">
                        <div className="left">{image}</div>
                        <div className="right">
                          <div className="text">
                            <div className="text-title">Event</div>
                            <div className="text-info">{event.name}</div>
                          </div>

                          <div className="text">
                            <div className="text-title">Where</div>
                            <div className="text-info">{event.location}</div>
                          </div>

                          <div className="text">
                            <div className="text-title">When</div>
                            <div className="text-info">
                              {new Date(event.time).toDateString()}{" "}
                              {new Date(event.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="invite-host">
            <h1>My Hosted Events</h1>
            {noEventMessage}
            {hostedEvents.map(event => {
              let image;
              if (!event.image_url) {
                image = (
                  <img
                    src="gif_012.gif"
                    className="user-show-event-image"
                    alt="dinner_placeholder"
                  />
                );
              } else {
                image = (
                  <img
                    height="auto"
                    src={`${event.image_url}`}
                    className="user-show-event-image"
                  />
                );
              }
              return (
                <div className="user-event hosted-event" key={event._id + 1}>
                  <Link to={`/events/${event._id}`}>
                    <div className="user-event-details">
                      <div className="left">{image}</div>

                      <div className="text">
                        <div className="text-title">Event</div>
                        <div className="text-info">{event.name}</div>
                      </div>

                      <div className="text">
                        <div className="text-title">Where</div>
                        <div className="text-info">{event.location}</div>
                      </div>

                      <div className="text">
                        <div className="text-title">When</div>
                        <div className="text-info">
                          {new Date(event.time).toDateString()}{" "}
                          {new Date(event.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;