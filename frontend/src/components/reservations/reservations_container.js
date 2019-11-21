import { connect } from "react-redux";
import Reservations from './reservations';
import { fetchEventReservations, 
  createReservation,
  reviseReservation } from '../../actions/reservation_actions';


const mSTP = (state, ownProps) => {
  // debugger
  return {
    event: state.events,
    user: state.session.user,
    reservations: state.reservations,
    //   [ownProps.match.params.id]
  };
};

const mDTP = dispatch => ({
  fetchEventReservations: id => dispatch(fetchEventReservations(id)),
  createReservation: id => dispatch(createReservation(id)),
  reviseReservation: data => dispatch(reviseReservation(data))
});

export default connect(mSTP, mDTP)(Reservations);