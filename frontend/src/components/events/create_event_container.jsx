import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import CreateEvent from './create_event_form';
import "./events.css";
import "./create_event.scss";
import { createReservation } from '../../actions/reservation_actions'

const mSTP = state => ({
    event: {
        name: "",
        location: "",
        body: "",
        time: "",
        guest_emails: [],
        email: "",
        host: "",
        private: true,
        
    },

    formType: "Create Event"
});

const mDTP = dispatch => ({
    createEvent: event => dispatch(createEvent(event)),
    createReservation: data => dispatch(createReservation(data))
});

export default connect(mSTP, mDTP)(CreateEvent)