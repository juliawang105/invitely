import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import CreateEvent from './create_event_form';
import "./events.css";

const mSTP = state => ({
    event: {
        name: "",
        location: "",
        body: "",
        time: "",
        guest_emails: [],
        email: "",
        private: true
    },

    formType: "Create Event"
});

const mDTP = dispatch => ({
    createEvent: event => dispatch(createEvent(event))
});

export default connect(mSTP, mDTP)(CreateEvent)