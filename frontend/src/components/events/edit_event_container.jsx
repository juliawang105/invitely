import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateEvent from './create_event_form';
import { getEvent, updateEvent, } from '../../actions/event_actions';
import { fetchEventReservations } from "../../actions/reservation_actions";
import "./edit_event.scss";

class EditEvent extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
          name: "",
          location: "",
          body: "",
          time: "",
          guest_emails: "",
          email: "",
          private: true,
          image_url: ""
        };
    }; 

    componentDidMount(){

      let navbar = document.querySelector(".nav-bar");
      if (navbar) {
        navbar.className += " orange";
      }
  

       
        this.props.getEvent(this.props.match.params.id)
            .then(() => this.setState({
                name: this.props.event.name,
                location: this.props.event.location,
                body: this.props.event.body,
                time: this.props.event.time,
                guest_emails: this.props.event.guest_emails,
                email: this.props.event.email,
                private: true,
                image_url: this.props.event.image_url
            }))
            .then(() => this.props.fetchEventReservations(this.props.event.id));
    }

    render(){
        if (!this.props.event){
            return null; 
        }

        let edit;
        let reservations=this.props.reservations.event;

        if(this.props.event.user === this.props.session.user.id){
            edit = ( 
                <div>
                <CreateEvent
                    updateEvent={this.props.updateEvent}
                    formType={this.props.formType}
                    event={this.props.event}
                    getEvent={this.props.getEvent}
                    reservations={reservations}    
                />
                </div>
            )
        } else {
           edit =( 
            <div>
                You are not authorized to make edits.
            </div>
            )
        }
        return (
            <div>
                <div className="back-button">
                    <Link to={`/events/${this.props.event.id}`}>Go Back</Link>
                </div>
                {edit}
            </div>
        );
    }
}

const mSTP = (state, ownProps) => {
    return {
      event: state.events.new,
      formType: "Edit Event",
      session: state.session,
      reservations: state.reservations
    };
};

const mDTP = dispatch => ({
  getEvent: id => dispatch(getEvent(id)),
  updateEvent: event => dispatch(updateEvent(event)),
  fetchEventReservations: id => dispatch(fetchEventReservations(id))
});

export default connect(mSTP, mDTP)(EditEvent)