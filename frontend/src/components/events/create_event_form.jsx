import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const google = window.google = window.google ? window.google : {};

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.event;

    this.setState({
      scriptLoaded: false,
      scriptError: false,
      loaded: false
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.processEmail = this.processEmail.bind(this);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.renderCannotSubmit = this.renderCannotSubmit.bind(this);
    this.cannotSubmitMessage = "";
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
    if (this.props.formType === "Create Event") {
      this.setState({
        file: null,
        image_url: ""
      });
    }

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
      // console.log(response);
      this.setState({
        image_url: response.data.Location
      });
    }).catch(error => {
      console.log(error);
    });
  }

  handleFileUpload = (event) => {
    this.setState({
      file: event.target.files
    }, () => {
      this.submitFile();
    });
  }

  handleScriptCreate() {
      this.setState({ scriptLoaded: false })
    }
 
    handleScriptError() {
      this.setState({ scriptError: true })
    }
 
    handleScriptLoad() {
      this.setState({ scriptLoaded: true })
    }

    handleClick(e) {
      e.preventDefault();

    if(this.state.email.indexOf('@') !== -1){
      this.setState({
        guest_emails: this.state.guest_emails.concat([this.state.email])
      });
    };

    this.setState({
      email: ""
    });
    }

  processEmail(email, eventId) {
    let date = new Date(this.state.time).toDateString();
    let time = new Date(this.state.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let event_name = this.state.name;
    let event_location = this.state.location;
    let event_time = date + ", " + time;
    let event_email = email;
    let event_url = `invitely.herokuapp.com/#/events/${eventId}`;
    
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
        event_email: event_email,
        event_url: event_url
      })
    }).catch((error) => {
      console.log(error)
    });
  };

  renderCannotSubmit() {
    this.cannotSubmitMessage = (
      <div className="error">
        <div className="error-text">
          Event info is not complete
        </div>
      </div>
    );
  }


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

            this.processEmail(emails[i], event._id);

            this.props.createReservation(reservation)   
            this.props.history.push(`/events/${res.event.data._id}`);
          };
        })
        .catch(err => {
          this.renderCannotSubmit()
          this.props.history.push(`/events`)
        })
    } else {
      this.props
        .updateEvent(this.state)
        .then(res => {
          this.props.history.push(`/events/${res.event.data._id}`);
        })
        .catch(err => {
          this.renderCannotSubmit()
          this.props.history.push(`/events/:id/edit`);
        })
    };
  };

  render() {
    let emails;
    let button;
    let emailInput;
    let guestListHeader;
    let header;
    let date = new Date(Date.now()).toISOString().slice(0, 10).toString() + "T00:00:00"
    // debugger;
    // console.log(date)
    if(this.props.formType === 'Create Event'){
      button = (
        <button
          className="event-submit"
          onClick={this.handleSubmit}
        >
          Create Event and Send Invites
        </button>
      );
      emails = this.state.guest_emails.map((email, i) => {
        let format = (
          <div className="each-email" key={i}>
            {email}
            {/* <ul>
              <li key={i}>{email}</li>
            </ul> */}
          </div>
        );
        return format;
      });
      guestListHeader = <h2 className="guest-list-header">Guest List</h2>
      header = <h1 className="form-head">Create your event</h1>
    } else {
      button = (
        <button
          className="event-submit"
          onClick={this.handleSubmit}
        >
          Update Event
        </button>
      );
      let reservations = this.props.reservations;
      if (reservations.length !== 0) {
        emails = reservations.map((reservation, i) => {
          let format = (
            <div className="each-email" key={i}>
              {reservation.email}
              {/* <ul>
                <li key={i}>{reservation.email}</li>
              </ul> */}
            </div>
          );
          return format;
        });
      }
      guestListHeader = <h2 className="guest-list-header">Guest List</h2>;
      header = <h1 className="form-head">Update your event</h1>;
    };

    if(this.props.formType === 'Create Event'){
      emailInput = (
        <div className="event-input-email">
          <input
            id="emailAddress"
            type="email"
            // required
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
                // required
              />
            </div>
            <div className="event-input">
              <input
                ref={this.autocompleteInput}
                id="autocomplete"
                onChange={this.update("location")}
                type="text"
                value={this.state.location}
                placeholder="Event address"
                // required
              />
            </div>
            <div className="event-input">
              <input
                onChange={this.update("time")}
                type="datetime-local"
                value={this.state.time}
                placeholder="Event Time"
                min={date}
                // min="2019-12-16T16:15:23"
                // required
              />
            </div>
            <div className="event-input">
              <input
                onChange={this.update("end_time")}
                type="datetime-local"
                value={this.state.end_time}
                placeholder="End Time"
                min={date}
                // required
              />
            </div>
            <div className="event-input">
              {/* <div className="file-upload"> */}
                {/* <div className="file">
                  <h1 className="file-label">Add an image to your event</h1>
                  </div>
                </div> */}
                {/* <label className="file"> */}
                  <input 
                    type="file" 
                    onChange={this.handleFileUpload}
                    title="Event Image"
                    id="file"
                    className="custom-file-input"
                    />

                    {/* <span className="file-custom"> </span> */}
                {/* </label> */}
            </div>
            <div className="event-input">
              <textarea
                onChange={this.update("body")}
                className="event-form-description"
                type="text"
                value={this.state.body}
                placeholder="Event Description"
                // cols="30"
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
            {this.cannotSubmitMessage}
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