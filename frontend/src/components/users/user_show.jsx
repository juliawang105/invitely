import React from "react";
import ReservationItem from '../reservations/reservation_item';
import { Link } from 'react-router-dom';
import "./user_show.css";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      let navbar = document.querySelector(".nav-bar");
      if (navbar) {
        navbar.className += " orange";
      }
  

    console.log(this.props);

    this.props.fetchUserReservations(this.props.user.email)
      .then(() => {
        this.props.fetchUserEvents(this.props.user.id)
          .then(() => this.setState({ loaded: true }));
      });
  }

  update() {
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    let reservations = this.props.reservations.all;
    let user = this.props.user;
    let events = this.props.events.all;

    return (
      <div className="user-show">

        <div>
          <h1>My Invites</h1>
          {reservations.map(reservation => {
            return (
              <ReservationItem
                reservation={reservation}
                key={reservation._id}
                user={user}
                event={events[0]}
              />
              // <div>{reservation.event}</div>
            );
          })}
        </div>
        <div>
          <h1>My Events</h1>
          {events.map(event => {
            return (
              <Link to={`/events/${event._id}`}>
                <div key={event._id}>
                  <br />
                  {event.name}
                  <br />
                  {event.time}
                  <br />
                  {event.location}
                  <br />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;