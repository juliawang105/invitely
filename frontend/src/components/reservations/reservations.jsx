import React from 'react';
import ReservationItem from './reservation_item'

class Reservations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.props.fetchEventReservations(this.props.event.new._id)
      .then(() => this.setState({loaded: true}));
  }

  render() {

    if (!this.state.loaded) {
      return null;
    }

    let reservations = this.props.reservations.event;
    let user = this.props.user;
    let event = this.props.event.new;
    
    return (
      <div>
        {reservations.map ((reservation) => {
          return (
            <ReservationItem
              reservation={reservation}
              key={reservation._id}
              user={user}
              event = {event}
              reviseReservation={this.props.reviseReservation}
            />
          );
        })}
      </div>
    )
  }
}

export default Reservations;