import axios from "axios";

export const getReservations = () => {
  return axios.get("/api/reservations");
};

export const getUserReservations = user_id => {
  return axios.get(`/api/reservations/user/${user_id}`);
};

export const getEventReservations = event_id => {
  return axios.get(`/api/reservations/event/${event_id}`);
};

export const getReservation = id => {
  return axios.get(`/api/reservations/${id}`);
};

export const makeReservation = data => {
  return axios.post("/api/reservations/", data);
};

export const updateReservation = data => {
  return axios.patch(`/api/reservations/${data._id}`, data);
};
