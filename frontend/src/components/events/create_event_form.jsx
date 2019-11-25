import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


const google = window.google = window.google ? window.google : {};

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.event;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  update(field) {
    return e => {
        this.setState({ [field]: e.target.value})    
    };
  };

  componentDidMount() {
    let navbar = document.querySelector(".nav-bar");
    if (navbar) {
      navbar.className += " orange";
    }
    
    this.setState({
      file: null,
      image_url: ""
    });

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  };
  
  handlePlaceChanged(e){
    const place = this.autocomplete.getPlace();
    this.setState({
      location: place.formatted_address,
    }); 
  }

  submitFile() {
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/test-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
      this.setState({
        image_url: response.data.Location
      });
    }).catch(error => {
      // handle your error
    });
  }

  handleFileUpload = (event) => {
    this.setState({
      file: event.target.files
    }, () => {
      this.submitFile();
    });
  }

  handleClick(e){
    let event_name = this.state.name;
    let event_location = this.state.location;
    let event_time = this.state.time;
    let event_email = this.state.email
    
    fetch('/api/send_email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: event_name,
        event_location: event_location,
        event_time: event_time,
        event_email: event_email
      })
    }).catch((error) => {
      console.log(error)
    });
    
    e.preventDefault();

    if(this.state.email.indexOf('@') !== -1){
      this.setState({
        guest_emails: this.state.guest_emails.concat([this.state.email])
      });
    };

    this.setState({
      email: ""
    });
  };


  handleSubmit(e) {
    e.preventDefault();
    // let time = new Date(this.state.time);
    // let newTime = time.toDateString() + " " + time.toLocaleTimeString();
    // this.setState({
    //   time: newTime
    // })
    if(this.props.formType === 'Create Event'){
      this.props.createEvent(this.state)
        .then(res => {
          let event = res.event.data;
          let emails = event.guest_emails;

          for (let i = 0; i < emails.length; i++) {
            let guest = emails[i];
            let reservation = {
              email: guest,
              event: event._id,
              status: "invited"
            };
            this.props.createReservation(reservation)   
            this.props.history.push(`/events/${res.event.data._id}`);
          };
        }
        )
    } else {
      this.props.updateEvent(this.state)
        .then(
          res => {
            this.props.history.push(`/events/${res.event.data._id}`);
          }
        )
    };
  };

  render() {
    let emails;
    let button;
    let emailInput;
    let guestListHeader;
    let header;

    if(this.props.formType === 'Create Event'){
      button = <button className="event-submit" onClick={this.handleSubmit}>Create Event and Send Invites</button>;
      emails = this.state.guest_emails.map((email, i) => {
        let format = (
          <div className="each-email">
            <ul>
              <li key={i}>{email}</li>
            </ul>
          </div>
        );
        return format;
      });
      guestListHeader = <h2 className="guest-list-header">Guest List</h2>
      header = <h1 className="form-head">Create your event</h1>
    } else {
      button = (
        <button className="event-submit" onClick={this.handleSubmit}>
          Update Event
        </button>
      );
      emails = this.props.event.guest_emails.map((email, i) => {
        let format = (
          <div className="each-email">
            <ul>
              <li key={i}>{email}</li>
            </ul>
          </div>
        );
        return format;
      });
      guestListHeader = <h2 className="guest-list-header">Guest List</h2>;
      header = <h1 className="form-head">Update your event</h1>;
    };

    if(this.props.formType === 'Create Event'){
      emailInput = (
        <div className="event-input-email">
          <input
            id="emailAddress"
            type="email"
            required
            pattern=".+@beststartupever.com"
            onChange={this.update("email")}
            value={this.state.email}
            placeholder="Guest Emails"
          />
          <button onClick={this.handleClick}>Add Email</button>
        </div>
      );  
    } 
    return (
      <div id="event-form">
        {header}
        <div id="create-form">
          <div className="event-inputs">
            <div className="event-input">
              <input
                onChange={this.update("name")}
                type="text"
                value={this.state.name}
                placeholder="Event Name"
              />
            </div>
            <div className="event-input">
              <input
                ref={this.autocompleteInput}
                id="autocomplete"
                onChange={this.update("location")}
                type="text"
                value={this.state.location}
                placeholder="Enter your address"
              />
            </div>
            <div className="event-input">
              <input
                onChange={this.update("time")}
                type="datetime-local"
                value={this.state.time}
                placeholder="Event Time"
              />
            </div>
            <div className="event-input">
              <input
                onChange={this.update("end_time")}
                type="datetime-local"
                value={this.state.end_time}
                placeholder="End Time"
              />
            </div>
            <div className="event-input">
              <input type="file" onChange={this.handleFileUpload} />
            </div>
            <div className="event-input">
              <textarea
                onChange={this.update("body")}
                className="event-form-description"
                type="text"
                value={this.state.body}
                placeholder="Event Description"
                cols="30"
                rows="10"
                maxLength="1000"
              ></textarea>
            </div>
            <div className="event-input">
              <input
                onChange={this.update("host")}
                type="text"
                value={this.state.host}
                placeholder="Host(s)"
                className="floating-label-field"
                id="host-field"
              />
            </div>
            {emailInput}
            {button}
          </div>

          <div className="list">
            {guestListHeader}
            {emails}
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(CreateEvent);