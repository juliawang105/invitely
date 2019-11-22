import React from "react";
import ReservationItem from './reservation_item';

class Users extends React.Component {
  constructor(props) {
    super(props);
    };

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

  update() {
    return e =>
      
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {

    let reservations = this.props.reservations.event;
    let user = this.props.user;
    let event = this.props.event.new;

    return (
      <div className="reservations">
        <div>
          {reservations.map(reservation => {
            return (
              <ReservationItem
                reservation={reservation}
                key={reservation._id}
                user={user}
                event={event}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;
