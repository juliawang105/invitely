import React from 'react';

class CreateReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      event: this.props.event._id,
      status: "invited"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.processEmail = this.processEmail.bind(this);
  }

  handleInput() {
    return e => {
      this.setState({ email: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const reservation = this.state;
    this.props.createReservation(reservation)
      .then(() => this.processEmail(this.state.email, this.state.event))
      .then(() => this.setState({ email: "" }));
  }

  processEmail(email, eventId) {
    let date = new Date(this.props.event.time).toDateString();
    let time = new Date(this.props.event.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    let event_name = this.props.event.name;
    let event_location = this.props.event.location;
    let event_time = date + ", " + time;
    let event_email = email;
    let event_url = `invitely.herokuapp.com/#/events/${eventId}`;

    // console.log({event_name, event_location, event_time, event_email, event_url, eventId, email});

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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleInput()}
          />
          <input type="submit" value="Add Guest" />
        </form>
      </div>
    );
  }
}

export default CreateReservation;