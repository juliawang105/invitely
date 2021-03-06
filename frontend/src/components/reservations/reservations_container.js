import { connect } from "react-redux";
import Reservations from './reservations';
import { fetchEventReservations, 
  createReservation,
  reviseReservation,
  destroyReservation } from '../../actions/reservation_actions';


const mSTP = (state, ownProps) => {
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
  reviseReservation: data => dispatch(reviseReservation(data)),
  destroyReservation: data => dispatch(destroyReservation(data))
});

export default connect(mSTP, mDTP)(Reservations);