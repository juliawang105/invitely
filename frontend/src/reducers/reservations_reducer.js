import {
  RECEIVE_RESERVATIONS,
  RECEIVE_RESERVATION,
  RECEIVE_USER_RESERVATIONS,
  RECEIVE_EVENT_RESERVATIONS,
  REMOVE_RESERVATION
} from "../actions/reservation_actions";

const ReservationsReducer = (state = { 
  all: {}, user: {}, event: [], new: undefined
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
      // newState.new = action.reservation.data;
      let invite = action.reservation.data;
      let ids = [];
      for (let i = 0; i < newState.event.length; i++) {
        ids.push(newState.event[i]._id);
      }
      if (!ids.includes(invite._id)) {
        newState.event.unshift(invite);
      }
      return newState;



    case REMOVE_RESERVATION: 
      // const reservation = action.id.data;
      // let idx = (newState.event).indexOf(reservation);
      // newState.event.splice(idx, 1);
      // return newState;



      const reservation = action.id.data;
      // console.log('====================================');
      // console.log(reservation);
      // console.log('====================================');
      // console.log('====================================');
      // console.log(newState.event);
      // console.log('====================================');
      // let idx = Object.values(newState.event).indexOf(reservation);
      // let idx = (newState.event).indexOf(reservation);
      // console.log('====================================');
      // console.log(Object.values(newState.event));
      // console.log(reservation);
      // console.log(Object.values(newState.event)[0]._id === reservation._id);
      // console.log('====================================');
      let idx;
      // Object.values(newState.event).forEach((pojo, i) => {
      //   if (pojo._id === reservation._id) {
      //     idx = i;
      //     throw BreakException;
      //   }
      // });

      
      // break exception is only to break out of loop once the id is found in the array
      const BreakException = {};

      try {
        Object.values(newState.event).forEach((pojo, i) => {
          if (pojo._id === reservation._id) {
            idx = i;
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }

      newState.event.splice(idx, 1);
      return newState;
    default:
      return state;
  }
};

export default ReservationsReducer;
