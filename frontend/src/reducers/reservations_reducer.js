import {
  RECEIVE_RESERVATIONS,
  RECEIVE_RESERVATION,
  RECEIVE_USER_RESERVATIONS,
  RECEIVE_EVENT_RESERVATIONS,
} from "../actions/reservation_actions";

const ReservationsReducer = (state = { 
  all: {}, user: {}, event: {}, new: undefined
}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      newState.all = action.reservations.data;
      return newState;
    case RECEIVE_USER_RESERVATIONS:
      newState.user = action.reservations.data;
      return newState;
    case RECEIVE_EVENT_RESERVATIONS:
      newState.event = action.reservations.data;
      return newState;
    case RECEIVE_RESERVATION:
      newState.new = action.reservation.data;
      return newState;
    default:
      return state;
  }
};

export default ReservationsReducer;
