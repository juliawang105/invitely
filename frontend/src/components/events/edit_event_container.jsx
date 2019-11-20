import React from 'react';
import { connect } from 'react-redux';
import CreateEvent from './create_event_form';
import { getEvent, updateEvent, } from '../../actions/event_actions'

class EditEvent extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.event);
        this.state = {
          name: "",
          location: "",
          body: "",
          time: "",
          guest_emails: "",
          email: "",
          private: true
        };
    }; 

    componentDidMount(){
        // debugger
        this.props.getEvent(this.props.match.params.id)
            .then(() => this.setState({
                name: this.props.event.name,
                location: this.props.event.location,
                body: this.props.event.body,
                time: this.props.event.time,
                guest_emails: this.props.event.guest_emails,
                email: this.props.event.email,
                private: true
            }))
        // this.setState({ event })
    };

    render(){
        // debugger 
        if (!this.props.event){
            return null; 
        };

        return (
          <div>
              
            <CreateEvent
              updateEvent={this.props.updateEvent}
              formType={this.props.formType}
              event={this.props.event}
              getEvent={this.props.getEvent}
            />
          </div>
        );
    }
}

const mSTP = (state, ownProps) => {
    
    // debugger 
    return{
    event: state.events.new,
    formType: "Edit Event"
    }
};

const mDTP = dispatch => ({
    getEvent: id => dispatch(getEvent(id)),
    updateEvent: (event) => dispatch(updateEvent(event))
});

export default connect(mSTP, mDTP)(EditEvent)