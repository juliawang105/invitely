import React from 'react';
import ReservationItem from './reservation_item'
import CreateReservation from './create_reservation';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  handleSubmit(e) {
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
          <form onSubmit={this.handleSubmit}>
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
            />
          );
        })}
      </div>
    );
  }
}

export default Reservations;