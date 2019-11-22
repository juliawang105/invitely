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
  }

  handleInput() {
    return e => {
      this.setState({email: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const reservation = this.state;
    this.props.createReservation(reservation);
    this.setState({ email: "" });
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
          <input type="submit" value="Add Guest!" />
        </form>
      </div>
    );
  }
}

export default CreateReservation;