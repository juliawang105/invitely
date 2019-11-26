import { connect } from "react-redux";
import Users from './user_show';
import { fetchUserReservations } from '../../actions/reservation_actions';
import { fetchUserEvents, getEvent } from '../../actions/event_actions';


const mSTP = (state, ownProps) => {
  return {
    events: state.events,
    user: state.session.user,
    reservations: state.reservations
  };
};

const mDTP = dispatch => ({
  fetchUserReservations: email => dispatch(fetchUserReservations(email)),
  fetchUserEvents: id => dispatch(fetchUserEvents(id)),
  getEvent: id => dispatch(getEvent(id)),
  // getReservationEvent: id => dispatch(getReservationEvent(id))
});


export default connect(mSTP, mDTP)(Users);
