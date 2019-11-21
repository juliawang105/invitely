import React from 'react';

class ReservationItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      date: this.props.reservation.date,
      email: this.props.reservation.email,
      event: this.props.reservation.event,
      status: this.props.reservation.status,
      user: this.props.reservation.user,
      _id: this.props.reservation._id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(e) {
    this.setState({ status: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const reservation  = this.state
    this.props.reviseReservation(reservation)
      .then((res) => console.log(res));
  }

  render() {
    let status 
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
    if (reservation.email === user.email || user.id === event) {
      removeRes = (
        <div>
          Removable
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