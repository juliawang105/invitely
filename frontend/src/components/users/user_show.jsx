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
          let j = 1
          for (let i = 0; i < reservations.length; i++) {
            this.props.getEvent(reservations[i].event)
            .then(() => {
              j++;
              if (j === reservations.length) {
                this.setState({ loaded: true });
                console.log(j);
                console.log("third");
              }
            });
            // j++;
          }
          // console.log("first");
        });
        // .then(() => {
        //   console.log("second");
        //   this.setState({
        //     hosted: this.props.events.all.sort(function(a, b) {
        //       return new Date(a.time) - new Date(b.time);
        //     }),
        //     invited: this.props.events.user.sort(function(a, b) {
        //       return new Date(a.time) - new Date(b.time);
        //     })
        //   });
        // })
        // .then(() => {
        //   this.setState({ loaded: true });
        //   // console.log("third");
        // });
    });
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



    

    return (
      <div className="user-show">
        <div className="user-show-box">

          <div className="invite-host">
            <h1>Invited Events</h1>
            {inviteEvents.map(event => {
              return (
                <div className="user-event" key={event._id}>
                  <Link to={`/events/${event._id}`}>
                    <div className="user-event-details">
                      <div className="text">
                        <div className="text-title">
                          <h3>Event</h3>
                        </div>
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
                          {new Date(event.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          
          <div className="invite-host">
            <h1>Hosted Events</h1>
            {hostedEvents.map(event => {
              return (
                <div className="user-event" key={event._id + 1}>
                  <Link to={`/events/${event._id}`}>
                    <div className="user-event-details">
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
                          {new Date(event.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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