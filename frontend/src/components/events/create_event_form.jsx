import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Script from 'react-load-script';

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
      console.log(process.env.REACT_APP_GOOGLE_API_KEY);
      console.log("HER");

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

  handleScriptCreate() {
      this.setState({ scriptLoaded: false })
    }
 
    handleScriptError() {
      this.setState({ scriptError: true })
    }
 
    handleScriptLoad() {
      this.setState({ scriptLoaded: true })
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

    if(this.props.formType === 'Create Event'){
      button = <button onClick={this.handleSubmit}>Create Event and Send Invites!</button>;
      emails = this.state.guest_emails.map((email, i) => {
        let format = <li key={i}>{email}</li>;
        return format;
      });
      guestListHeader = <h2>Guest List</h2>
    } else {
      button = <button onClick={this.handleSubmit}>Update Event</button>;
    };

    if(this.props.formType === 'Create Event'){
      emailInput = (
        <div>
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
      <div id="create-form">
      <Script
              url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
              onCreate={this.handleScriptCreate.bind(this)}
              onError={this.handleScriptError.bind(this)}
              onLoad={this.handleScriptLoad.bind(this)}
            />
         <div>
          <input
            onChange={this.update("host")}
            type="text"
            value={this.state.host}
            placeholder="Host(s)"
          />

        <div>
          <input
            onChange={this.update("name")}
            type="text"
            value={this.state.name}
            placeholder="Event Name"
          />

          <textarea
            onChange={this.update("body")}
            type="text"
            value={this.state.body}
            placeholder="Event Description"
            cols="30"
            rows="10"
          ></textarea>

          <input
            ref={this.autocompleteInput}
            id="autocomplete"
            onChange={this.update("location")}
            type="text"
            value={this.state.location}
            placeholder="Enter your address"
          />
          <input
            onChange={this.update("time")}
            type="text"
            value={this.state.time}
            placeholder="Event Time"
          />
          {emailInput}

          <div>
            <input type="file" onChange={this.handleFileUpload} />
          </div>
          {button}
          <div className="list">
            {/* {guestListHeader} */}
            {emails}
          </div>
        </div>
      </div>
    </div>
    );
  }
};

export default withRouter(CreateEvent);