import React from 'react';
import ReservationItem from './reservation_item'
import { withRouter } from "react-router-dom";
import CreateReservation from './create_reservation';
import "./reservations.css";
import axios from "axios";

class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      reservation: {
        email: "",
        event: this.props.event.new._id,
        status: "invited"
      }
    };
    this.createReservation = this.createReservation.bind(this);
    this.processEmail = this.processEmail.bind(this);
  }

  componentDidMount() {
    let navbar = document.querySelector(".nav-bar.orange");
    if (navbar) {
      navbar.classList.remove("orange");
    }
    this.props
      .fetchEventReservations(this.props.event.new._id)
      .then(() => this.setState({ loaded: true }));
  }

  handleInput() {
    return e => {
      this.setState({
        reservation: {
          email: e.target.value,
          event: this.props.event.new._id,
          status: "invited"
        }
      });
    };
  }

  createReservation(e) {
    e.preventDefault();
    const reservation = this.state.reservation;
    this.props.createReservation(reservation)
      .then(() => this.processEmail(this.state.reservation.email, this.state.reservation.event))
      .then(() => this.setState({ reservation: { email: "" } }));
  }

  processEmail(email, eventId) {
    let date = new Date(this.props.event.new.time).toDateString();
    let time = new Date(this.props.event.new.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    let event_name = this.props.event.new.name;
    let event_location = this.props.event.new.location;
    let event_time = date + ", " + time;
    let event_email = email;
    let event_url = `invitely.herokuapp.com/#/events/${eventId}`;

    // console.log({
    //   event_name,
    //   event_location,
    //   event_time,
    //   event_email,
    //   event_url,
    //   eventId,
    //   email
    // });

    fetch("/api/send_email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_name: event_name,
        event_location: event_location,
        event_time: event_time,
        event_email: event_email,
        event_url: event_url
      })
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    let reservations = this.props.reservations.event;
    let user = this.props.user;
    let event = this.props.event.new;

    let create;
    if (user.id === event.user) {
      create = (
        <div className="reservation-form-box">
          <form
            onSubmit={this.createReservation}
            className="create-reservation-form"
          >
            <input
              type="text"
              value={this.state.reservation.email}
              onChange={this.handleInput()}
              className="reservation-text-box"
              placeholder="Add guest email"
            />
            <input
              type="submit"
              value="Add Guest"
              className="reservation-button"
            />
          </form>
        </div>
      );
    }

    return (
      <div className="reservations">
        <h2 className="reservations-title bold">Guest List</h2>
        {create}
        {reservations.map(reservation => {
          return (
            <ReservationItem
              reservation={reservation}
              key={reservation._id}
              user={user}
              event={event}
              reviseReservation={this.props.reviseReservation}
              delete={this.props.destroyReservation}
            />
          );
        })}
      </div>
    );
  }
}

export default Reservations;