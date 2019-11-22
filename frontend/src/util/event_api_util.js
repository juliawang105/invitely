import axios from "axios";

export const getEvents = () => {
  return axios.get("/api/events");
};
export const getEvent = id => {
  // console.log(id)
  return axios.get(`/api/events/${id}`);
};
export const createEvent = data => {
  return axios.post("/api/events/", data);
};
export const updateEvent = data => {
  return axios.patch(`/api/events/${data.id}`, data);
};

export const getUserEvents = id => {
  return axios.get(`/api/events/user/${id}`);
};
