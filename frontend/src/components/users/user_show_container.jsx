import { connect } from "react-redux";
import Users from './user_show';
import { fetchEventReservations } from '../../actions/reservation_actions';


const mSTP = (state, ownProps) => {
  // debugger
  return {
    event: state.events,
    user: state.session.user,
    reservations: state.reservations
  };
};

const mDTP = dispatch => ({
  fetchEventReservations: id => dispatch(fetchEventReservations(id))
});


export default connect(mSTP, mDTP)(Users);
