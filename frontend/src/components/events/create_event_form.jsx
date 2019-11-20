import React from 'react';
import { withRouter } from 'react-router-dom'

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.event;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

//   update_emails(){
//       let newEmails = this.state.guest_emails.push
//     return e => {
//         this.setState({[guest_emails]: this})
//     }
//   }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            onChange={this.update("name")}
            type="text"
            value={this.state.name}
            placeholder="Event Name"
          />

          <input
            onChange={this.update("body")}
            type="text"
            value={this.state.body}
            placeholder="Event Description"
          />

          <input
            onChange={this.update("location")}
            type="text"
            value={this.state.location}
            placeholder="Event Location"
          />

          <input
            onChange={this.update("time")}
            type="text"
            value={this.state.time}
            placeholder="Event Time"
          />

          <input
            onChange={this.update("email")}
            type="text"
            value={this.state.email}
            placeholder="Guest Emails"
          />

          <button>Create Event</button>
        </div>
      </form>
    );
  }
};

export default withRouter(CreateEvent);