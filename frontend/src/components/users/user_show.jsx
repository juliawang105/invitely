import React from "react";
import ReservationItem from '../reservations/reservation_item';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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
      <div className="reservations">
        <div>
          {reservations.map(reservation => {
            return (
              <ReservationItem
                reservation={reservation}
                key={reservation.id}
                user={user}
                event={events[0]}
              />
            );
          })}
        </div>
        <div>
          {events.map(event => {
            return (
              <div key={event._id}>{event.name}</div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;