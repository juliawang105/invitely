import {
  getReservations,
  getReservation,
  getUserReservations,
  getEventReservations,
  makeReservation,
  updateReservation
} from "../util/reservation_api_util";

export const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';
export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
export const RECEIVE_USER_RESERVATIONS = 'RECEIVE_USER_RESERVATIONS';
export const RECEIVE_EVENT_RESERVATIONS = 'RECEIVE_EVENT_RESERVATIONS';
export const REMOVE_RESERVATION = 'REMOVE_RESERVATION';

const receiveReservations = reservations => ({
  type: RECEIVE_RESERVATIONS,
  reservations
}); 

const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation
}); 

const receiveUserReservations = reservations => ({
  type: RECEIVE_USER_RESERVATIONS,
  reservations
}); 

const receiveEventReservations = reservations => ({
  type: RECEIVE_EVENT_RESERVATIONS,
  reservations
}); 

const removeReservation = id => ({
  type: REMOVE_RESERVATION,
  id
})

export const deleteReservation = id => dispatch => (
  APIUtil.deleteReservation(id)
    .then((reservation) => dispatch(removeReservation(reservation)))
    .catch(err => console.log(err))
)

export const fetchReservations = () => dispatch => (
  getReservations()
    .then(reservations => dispatch(receiveReservations(reservations)))
    .catch(err => console.log(err)) 
);

export const fetchReservation = id => dispatch => (
  getReservation(id)
    .then(reservation => dispatch(receiveReservation(reservation)))
    .catch(err => console.log(err)) 
);

export const fetchUserReservations = user_id => dispatch => (
  getUserReservations(user_id)
    .then(reservations => dispatch(receiveUserReservations(reservations)))
    .catch(err => console.log(err)) 
);

export const fetchEventReservations = event_id => dispatch => (
  getEventReservations(event_id)
    .then(reservations => dispatch(receiveEventReservations(reservations)))
    .catch(err => console.log(err)) 
);

export const createReservation = data => dispatch => (
  makeReservation(data)
    .then(reservation => dispatch(receiveReservation(reservation)))
    .catch(err => console.log(err))
);

export const reviseReservation = data => dispatch => (
  updateReservation(data)
    .then(reservation => dispatch(receiveReservation(reservation)))
    .catch(err => console.log(err))
);
