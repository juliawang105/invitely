import React from 'react';

class ReservationItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.reservation.date,
      email: this.props.reservation.email,
      event: this.props.reservation.event,
      status: this.props.reservation.status,
      user: this.props.user.id,
      _id: this.props.reservation._id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeStatus(e) {
    // console.log(e.target.value);
    this.setState({ status: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log("hit")
    const reservation  = this.state;
    // console.log(reservation);

    this.props.reviseReservation(reservation)
      .then((res) => console.log(res))
      .catch(err => console.log(err));
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.delete(this.props.reservation._id);
  }

  render() {
    let status;
    let user = this.props.user;
    let reservation = this.props.reservation;
    let event = this.props.event;
    if (reservation.email === user.email) {
      status = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <select
              name="status"
              defaultValue={this.state.status}
              onChange={this.changeStatus}
            >
              <option disabled value="invited">
                Invited
              </option>
              <option value="accepted">Accept</option>
              <option value="maybe">Maybe</option>
              <option value="declined">Decline</option>
            </select>
            <input type="submit" value="Change Status"/>
          </form>
        </div>
      );
    } else {
      status = (
        <div>
          {reservation.status}
        </div>
      )
    }
    let removeRes;
    if (reservation.email === user.email || user.id === event.user) {
      removeRes = (
        <div>
          <button onClick={() => this.props.delete(reservation._id)}>Delete Reservation</button>
        </div>
      )
    } 
    return(
      <div>
        {reservation.email}
        <br/>
        {status}
        {removeRes}
      </div>
    )
  }
}

export default ReservationItem;