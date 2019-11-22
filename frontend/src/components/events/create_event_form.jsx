import React from 'react';
import { withRouter } from 'react-router-dom';

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
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  };
  
  handlePlaceChanged(e){
    const place = this.autocomplete.getPlace();
    this.setState({
      location: place.formatted_address,
    });
  };

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
        })
        .catch((error) => {
            console.error(error);
        });
    
      

    e.preventDefault();
    this.setState( {guest_emails: this.state.guest_emails.concat([this.state.email])
    });
    this.setState( {email: ""})
  };

  handleSubmit(e) {
     
    e.preventDefault();
    if(this.props.formType === 'Create Event'){
      this.props.createEvent(this.state)
        .then(res => {
          //console.log(res)
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
          };
        }
      )
    } else {
      this.props.updateEvent(this.state)
    };
  };

  render() {
    // debugger
    let emails = this.state.guest_emails.map( (email) => {
      let format = <li>{email}</li>
      return format;
        
    })
    
    let button;
    let emailInput;

    if(this.props.formType === 'Create Event'){
      button = <button onClick={this.handleSubmit}>Create Event and Send Invites!</button>;
    } else {
      button = <button onClick={this.handleSubmit}>Update Event</button>;
    };

    if(this.props.formType === 'Create Event'){
      emailInput = <div>
            <input
              onChange={this.update("email")}
              type="text"
              value={this.state.email}
              placeholder="Guest Emails"
            />
            <button onClick={this.handleClick}>Add Email</button>
          </div>  
      } 



    return (
      <div id="create-form">
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
          {button}

          <div className="list">
            <h2>Your Guest List</h2>
            {emails}
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(CreateEvent);