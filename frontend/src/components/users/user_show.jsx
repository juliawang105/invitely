import React from "react";
import ReservationItem from '../reservations/reservation_item';
import { Link } from 'react-router-dom';

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
    this.props.fetchUserEvents(this.props.user.id)
    .then(() => {
      this.props.fetchUserReservations(this.props.user.email)
        .then((res) => {
          let reservations = res.reservations.data;
          // console.log(reservations)
          for (let i = 0; i < reservations.length; i++) {
            this.props.getEvent(reservations[i].event)
          }
        })
    }).then(() => this.setState({ loaded: true }));;
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
    // debugger
    // let reservations = this.props.reservations.all;
    let user = this.props.user;
    let hostedEvents = this.props.events.all;
    let inviteEvents = this.props.events.user;
    

    return (
      <div className="reservations">
        {/* <div>
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
        </div> */}
        <br/>
        <br/>
        <br/>
        <br/>

        <h1>Hosted Events</h1>
        <div>
          {hostedEvents.map(event => {
            return (
              <div key={event._id}><Link to={`/events/${event._id}`}>{event.name}</Link>
                <div>Description: {event.body}</div> 
                <br/>
                <div>Where: {event.location}</div>
                <br/>
                <div>When:{event.time}</div>
                <br/>
                <br />
              </div>
              
            );
          })}
        </div>

        <h1>Invited Events</h1>
        <div>
          {inviteEvents.map(event => {
            return (
              <div key={event._id}><Link to={`/events/${event._id}`}>{event.name}</Link>
                <div>Description: {event.body}</div>
                <br />
                <div>Where: {event.location}</div>
                <br />
                <div>When:{event.time}</div>
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Users;