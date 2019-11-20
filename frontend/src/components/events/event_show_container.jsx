import { connect } from 'react-redux';
import { getEvent, getEvents } from '../../actions/event_actions';
import EventShow from './event_show'

const mSTP = (state, ownProps) => {
    // debugger
    return {
      event: state.events
    //   [ownProps.match.params.id]
    };
    
}

const mDTP = dispatch => ({
    getEvent: id => dispatch(getEvent(id))
});

export default connect(mSTP, mDTP)(EventShow)