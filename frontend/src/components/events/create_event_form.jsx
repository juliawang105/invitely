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
        this.setState({ [field]: e.target.value })    
    };
  };

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }
  
  handlePlaceChanged(e){
    const place = this.autocomplete.getPlace();
  

    this.setState({
      location: place.formatted_address,
      
    });

    
  }

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
    
      

    e.preventDefault();
    this.setState( {guest_emails: this.state.guest_emails.concat([this.state.email])
    });
    this.setState( {email: ""})
  };

  handleSubmit(e) {
      // debugger
    e.preventDefault();
    if(this.props.formType === 'Create Event'){
      this.props.createEvent(this.state);
    } else {
      this.props.updateEvent(this.state)
    }
    
  }

  render() {
    // debugger
    let emails = this.state.guest_emails.map( (email, i) => {
      let format = <li key={i}>{email}</li>
      return format;
        
    })
    


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
          <div>
            <input
              onChange={this.update("email")}
              type="text"
              value={this.state.email}
              placeholder="Guest Emails"
            />
            <button onClick={this.handleClick}>Add Email</button>
          </div>
          {button}
        </div>

        <div className="list">
          <h2>Your Guest List</h2>
          {emails}
        </div>
      </div>
    );
  }
};

export default withRouter(CreateEvent);