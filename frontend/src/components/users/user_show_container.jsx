import { connect } from "react-redux";
import Users from './user_show';
import { fetchUserReservations } from '../../actions/reservation_actions';
import { fetchUserEvents, getEvent } from '../../actions/event_actions';


const mSTP = (state, ownProps) => {
  // debugger
  return {
    events: state.events,
    user: state.session.user,
    reservations: state.reservations
  };
};

const mDTP = dispatch => ({
  fetchUserReservations: id => dispatch(fetchUserReservations(id)),
  fetchUserEvents: id => dispatch(fetchUserEvents(id)),
  getEvent: id => dispatch(getEvent(id))
});


export default connect(mSTP, mDTP)(Users);
