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
    fetch('/api/send_email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Isom Durm",
        email: "isomdurm@gmail.com",
        message: "working"
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