import React from 'react';
import ReservationItem from './reservation_item';

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
    this.props.createReservation(reservation);
    this.setState({ reservation: {email: "" }});
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
        <div>
          <form onSubmit={this.createReservation}>
            <input
              type="text"
              value={this.state.reservation.email}
              onChange={this.handleInput()}
            />
            <input type="submit" value="Add Guest!" />
          </form>
        </div>
      );
    }

    return (
      <div>
        {create}
        {reservations.map(reservation => {
          return (
            <ReservationItem
              reservation={reservation}
              key={reservation._id}
              user={user}
              event={event}
              reviseReservation={this.props.reviseReservation}
              delete = {this.props.destroyReservation}
            />
          );
        })}
      </div>
    );
  }
}

export default Reservations;