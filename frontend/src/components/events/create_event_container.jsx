import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions'
import CreateEvent from './create_event_form';

const mSTP = state => ({
    event: {
        name: "",
        location: "",
        body: "",
        time: "",
        guest_emails: [],
        email: "",
        private: false
    },

    formType: "Create Event"
});

const mDTP = dispatch => ({
    action: event => dispatch(createEvent(event))
});

export default connect(mSTP, mDTP)(CreateEvent)