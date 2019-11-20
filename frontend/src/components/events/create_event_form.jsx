import React from 'react';
import { withRouter } from 'react-router-dom'

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.event;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  update(field) {
    return e => {
        this.setState({ [field]: e.target.value })    
    };
  };

  handleClick(e){
    // ISOM DURM SEND GRID FUNCTION

    // fetch('/api/send_email', {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           name: "Isom Durm",
    //           email: "isomdurm@gmail.com",
    //           message: "working"
    //         })
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    
      debugger
    e.preventDefault();
    this.setState( {guest_emails: this.state.guest_emails.concat([this.state.email])
    });
    this.setState( {email: ""})
  };

  handleSubmit(e) {
      debugger
    e.preventDefault();
    this.props.action(this.state);
  }

  render() {
    //   debugger
    return (
      <div>
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

          <div>
            <input
              onChange={this.update("email")}
              type="text"
              value={this.state.email}
              placeholder="Guest Emails"
            />
            <button onClick={this.handleClick}>Add Email</button>
          </div>

          <button onClick={this.handleSubmit}>Create Event</button>
        </div>
      </div>
    );
  }
};

export default withRouter(CreateEvent);